import faker from 'faker'
import useSWR from 'swr'

export const tokens = new Array(10).fill({}).map(() => ({
    price: 100,
    ticker: faker.finance.currencyCode(),
    percentage: 100
}))
// BTC,ETH,BNB,DOGE,USDT,ADA,XRP,ICP,DOT,BCH,UNI,LINK,XLM,USDC,VET,SOL,ETC,EOS,THETA,FIL,AAVE

export default function useTicker() {
    const { data } = useSWR('/api/prices')

    return { data }
}
