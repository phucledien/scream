import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js';
import useMarkets from './useMarkets';
import { useActiveWeb3React } from '.';

export default function useTotalBorrowLimit() {
    const markets = useMarkets()
    const { account } = useActiveWeb3React()
    const [ totalBorrowLimit, setTotalBorrowLimit ] = useState(new BigNumber(0))
    const [ totalBorrowBalance, setTotalBorrowBalance ] = useState(new BigNumber(0))
    useEffect(() => {
       if(markets && account) {
           let tempBorrowLimit = new BigNumber(0);
           let tempBorrowBalance = new BigNumber(0);
           for(const market of markets) {
                if(market?.collateral) {
                    tempBorrowLimit = tempBorrowLimit.plus((market?.supplyBalance || new BigNumber(0)).times(+market?.collateralFactor || 0).times(market?.underlyingPriceUSD))
                }

                tempBorrowBalance = tempBorrowBalance.plus((market?.borrowBalance || new BigNumber(0)).times(market?.underlyingPriceUSD))
           }
           setTotalBorrowLimit(tempBorrowLimit)
           setTotalBorrowBalance(tempBorrowBalance)
       } else {
           setTotalBorrowLimit(new BigNumber(0))
           setTotalBorrowBalance(new BigNumber(0))
       }

    }, [markets, account])

    return {
        totalBorrowLimit,
        totalBorrowBalance
    }
}