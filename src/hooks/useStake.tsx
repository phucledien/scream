import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getXscreamContract, getTokenContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'

export default function useStake() {
    const [allowance, setAllowance] = useState(0)
    const [screamBalance, setScreamBalance] = useState(0)
    const [xscreamBalance, setXscreamBalance] = useState(0)
    const [shareValue, setShareValue] = useState(0)
    const [totalSupply, setTotalSupply] = useState(0)
    const [xScreamAPY, setxScreamAPY] = useState(0)
    const { account, library } = useActiveWeb3React()

    const tokenContract = getTokenContract('scream', library?.getSigner())
    const xScreamContract = getXscreamContract(library?.getSigner())

    const stake = async (amount) => {
        let formatAmount
        if (amount > 0) {
            formatAmount = ethers.utils.parseEther(amount)
        } else {
            formatAmount = 0
        }
        if (account) {
            let tx = null
            try {
                if (allowance < amount) {
                    await tokenContract.approve('0xe3D17C7e840ec140a7A51ACA351a482231760824', formatAmount)
                }
                tx = await xScreamContract.deposit(formatAmount)
                console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const unstake = async (amount) => {
        let formatAmount
        if (amount > 0) {
            formatAmount = ethers.utils.parseEther(amount.toString())
        } else {
            formatAmount = 0
        }
        if (account) {
            let tx = null
            try {
                tx = await xScreamContract.withdraw(formatAmount)
                console.log(tx)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const calculateAPY = () => {
        if (shareValue) {
            const difference = +new Date() - +new Date('August 3, 2021 07:00:00')
            const twelveHoursSinceLaunch = Math.floor(difference / (1000 * 60 * 60 * 12))
            const apy = ((shareValue - 1) * 730 * 100) / twelveHoursSinceLaunch
            setxScreamAPY(apy)
        }
    }

    useEffect(() => {
        if (account) {
            const fetchData = async () => {
                const [allow, scream, xscream, share, supply] = await Promise.all([
                    tokenContract.allowance(account, '0xe3D17C7e840ec140a7A51ACA351a482231760824'),
                    tokenContract.balanceOf(account),
                    xScreamContract.balanceOf(account),
                    xScreamContract.getShareValue(),
                    xScreamContract.totalSupply()
                ])
                // allow ? setAllowance(allow.toNumber()) : setAllowance(0)
                if (allow) {
                    const formatAllowance = ethers.utils.formatEther(allow)
                    setAllowance(Number(formatAllowance))
                }
                if (scream) {
                    const formatScream = ethers.utils.formatEther(scream)
                    setScreamBalance(Number(formatScream))
                }
                if (xscream) {
                    const formatXscream = ethers.utils.formatEther(xscream)
                    setXscreamBalance(Number(formatXscream))
                }
                if (share) {
                    const formatShare = ethers.utils.formatEther(share)
                    setShareValue(Number(formatShare))
                }
                if (supply) {
                    const formatSupply = ethers.utils.formatEther(supply)
                    setTotalSupply(Number(formatSupply))
                }
            }
            calculateAPY()
            fetchData()
        }
    }, [account])

    return {
        stake,
        unstake,
        screamBalance,
        xscreamBalance,
        totalSupply,
        shareValue,
        xScreamAPY
    }
}

// :)
