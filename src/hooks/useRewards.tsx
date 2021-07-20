import { useEffect, useState } from 'react'

export default function useRewards(coinContract) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)

    useEffect(() => {
        // do something here to pull that data ^.....

        setRewardValue('')
        setLendingApy('')
        setBorrowApy('')
    }, [])
    return { rewardValue, lendingApy, borrowApy }
}
