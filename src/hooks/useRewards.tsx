import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'
import usePrice from './usePrice'

export default function useRewards(tokenData?) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)
    const { account, library } = useActiveWeb3React()
    // const { screamPrice } = usePrice()

    const calculateAPY = async (compSpeeds, scToken) => {
        if (!tokenData) return
        const cash = await scToken.getCash()
        const totalBorrow = await scToken.totalBorrows()
        const totalSupply = cash + totalBorrow
        console.log(Number(cash), Number(totalBorrow), Number(totalSupply))
        try {

            const screamPrice = 1
            const blocksPerDay = 86400 // 1 seconds per block
            const daysPerYear = 365
            const screamPerYear = compSpeeds.mul(blocksPerDay).mul(daysPerYear).mul(screamPrice)
            const lendingAPY = screamPerYear.div(totalSupply).mul(100).toNumber()
            const borrowAPY = screamPerYear.div(totalBorrow).mul(100).toNumber()
            setLendingApy(lendingAPY)
            setBorrowApy(borrowAPY)
        } catch (error) {
            console.log(error)
            setLendingApy(0)
            setBorrowApy(0)
        }
    }

    useEffect(() => {
        if (account && tokenData) {
            const appContract = getUnitrollerContract(library?.getSigner())
            const fetchRewards = async () => {
                const [compAccrued, compSpeeds] = await Promise.all([appContract.compAccrued(account), appContract.compSpeeds(tokenData.id)])
                if (compAccrued) {
                    const compReward = ethers.utils.formatEther(compAccrued)
                    setRewardValue(Number(compReward))
                } else {
                    setRewardValue(0)
                }

                const scToken = getSctokenContract(tokenData.underlyingSymbol.toLowerCase(), library)

                calculateAPY(compSpeeds, scToken)
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
