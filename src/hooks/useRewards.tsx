import { useEffect, useState } from 'react'
import ethers from 'ethers'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'

export default function useRewards(tokenData?) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)
    const { account, library } = useActiveWeb3React()

    const calculateAPY = async (compSpeeds, scToken) => {
        if (!tokenData) return
        try {
            const totalSupply = await scToken.totalSupply()
            const totalBorrow = await scToken.totalBorrows()
            // write hook to calculate scream price
            const screamPrice = 1
            const blocksPerDay = 86400 // 1 seconds per block
            const daysPerYear = 365
            const screamPerYear = compSpeeds.mul(blocksPerDay).mul(daysPerYear).mul(screamPrice)
            const lendingAPY = screamPerYear.div(totalSupply).mul(100).toNumber()
            const borrowAPY = screamPerYear.div(totalBorrow).mul(100).toNumber()
            return { lendingAPY, borrowAPY }
        } catch (error) {
            console.log(error)
            return { lendingApy: 0, borrowApy: 0 }
        }
    }

    useEffect(() => {
        if (account && tokenData) {
            const appContract = getUnitrollerContract(library?.getSigner())
            const fetchRewards = async () => {
                const [compAccrued, compSpeeds] = await Promise.all([appContract.compAccrued(account), appContract.compSpeeds(tokenData.id)])
                if (compAccrued) {
                    setRewardValue(compAccrued.toNumber())
                } else {
                    setRewardValue(0)
                }

                const scToken = getSctokenContract(tokenData.underlyingSymbol.toLowerCase(), library)

                const apys = await calculateAPY(compSpeeds, scToken)
                setLendingApy(apys.lendingAPY)
                setBorrowApy(apys.borrowAPY)
            }
            fetchRewards()
        }
    }, [account, tokenData])

    const claimReward = async () => {
        if (!tokenData) return
        if (account) {
            const appContract = getUnitrollerContract(library?.getSigner())
            let tx = null
            try {
                tx = await appContract['claimComp(address,address[])'](account, [tokenData.id])
                console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const claimAll = async () => {
        if (account) {
            const appContract = getUnitrollerContract(library?.getSigner())
            let tx = null
            try {
                tx = await appContract['claimComp(address)'](account)
                console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        claimAll,
        claimReward,
        rewardValue,
        lendingApy,
        borrowApy
    }
}
