import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'
import usePrice from './usePrice'

export default function useRewards(tokenData?) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)
    const [compSpeeds, setCompSpeeds] = useState(0)
    const { account, library } = useActiveWeb3React()
    const { screamPrice } = usePrice()

    const calculateAPY = () => {
        if (!tokenData) return
        const totalSupply = tokenData.totalSupplyUsd
        const totalBorrow = tokenData.totalBorrowsUsd
        try {
            // const screamPrice = 1
            const blocksPerDay = 86400 // 1 seconds per block
            const daysPerYear = 365
            const screamPerYear = compSpeeds * blocksPerDay * daysPerYear * screamPrice
            const lendingAPY = (screamPerYear * 100) / totalSupply
            const borrowAPY = (screamPerYear * 100) / totalBorrow
            // console.log('lendingAPY', typeof lendingAPY)
            // console.log('borrowAPY', borrowAPY)
            setLendingApy(lendingAPY.toFixed(2))
            setBorrowApy(borrowAPY.toFixed(2))
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
                const [compAccrued, speeds] = await Promise.all([appContract.compAccrued(account), appContract.compSpeeds(tokenData.id)])
                if (compAccrued) {
                    const compReward = ethers.utils.formatEther(compAccrued)
                    setRewardValue(Number(compReward))
                } else {
                    setRewardValue(0)
                }

                if (speeds) {
                    const speed = ethers.utils.formatEther(speeds)
                    setCompSpeeds(Number(speed))
                } else {
                    setCompSpeeds(0)
                }
            }
            fetchRewards()
            calculateAPY()
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
