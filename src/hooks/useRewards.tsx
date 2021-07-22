import { useEffect, useState } from 'react'
import ethers from 'ethers'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'

export default function useRewards(tokenData) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)
    const { account, library } = useActiveWeb3React()

    useEffect(() => console.log(tokenData), [tokenData])

    useEffect(() => {
        if (account && tokenData) {
            const appContract = getUnitrollerContract(library?.getSigner())
            const fetchRewards = async () => {
                const [compAccrued, compSpeeds, compRate] = await Promise.all([appContract.compAccrued(account), appContract.compSpeeds(tokenData.id), appContract.compRate()])
                compAccrued ? setRewardValue(compAccrued.toNumber()) : setRewardValue(0)
                const scToken = getSctokenContract(tokenData.underlyingSymbol.toLowerCase(), library)

                const apys = await calculateAPY(compSpeeds, scToken)
                console.log(apys.lendingApy)
                setLendingApy(apys.lendingApy)
                setBorrowApy(apys.borrowApy)
            }
            fetchRewards()
        }
    }, [account, tokenData])

    const claimReward = async () => {
        if (account) {
            const appContract = getUnitrollerContract(library?.getSigner())
            let tx = null
            try {
                console.log(appContract)
                tx = await appContract["claimComp(address,address[])"](account, [tokenData.id])
                console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const calculateAPY = async (compSpeeds, scToken) => {
        try {
            //have to unwrap and rewrap for BigNumber to work?
            const totalSupply = await scToken.totalSupply()
            const totalBorrow = await scToken.totalBorrows()
            //write hook to calculate scream price
            const screamPrice = 1
            const blocksPerDay = 86400 // 1 seconds per block
            const daysPerYear = 365
            const screamPerYear = compSpeeds.mul(blocksPerDay).mul(daysPerYear).mul(screamPrice)
            const lendingApy = screamPerYear.div(totalSupply).mul(100).toNumber()
            const borrowApy = screamPerYear.div(totalBorrow).mul(100).toNumber()
            return {lendingApy, borrowApy}
        } catch (error) {
            console.log(error)
            return {lendingApy: 0, borrowApy: 0}
        }
    }

    return {
        claimReward,
        rewardValue,
        lendingApy,
        borrowApy
    }
}
