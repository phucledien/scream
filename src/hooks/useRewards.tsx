import { useEffect, useState } from 'react'

export default function useRewards(tokenData) {
    const [rewardValue, setRewardValue] = useState(0)
    const [lendingApy, setLendingApy] = useState(0)
    const [borrowApy, setBorrowApy] = useState(0)

    useEffect(() => console.log(tokenData), [tokenData])

    useEffect(() => {
        // do something here to pull that data...
        //
        //
        //
        //

        setRewardValue(0)
        setLendingApy(0)
        setBorrowApy(0)
    }, [])

    return { rewardValue, lendingApy, borrowApy }
}
