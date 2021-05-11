import faker from 'faker'

export const tokens = new Array(10).fill({}).map(() => ({
    price: faker.random.float({
        min: 1.0,
        max: 64000.0
    }),
    ticker: faker.finance.currencyCode(),
    percentage: faker.datatype
        .float({
            min: -10.0,
            max: 20.0
        })
        .toFixed(2)
}))

export default function useTicker() {
    const data = tokens

    // const coins = Object.keys(data.data).map((key,index) => return {
    //     symbol: key,

    // })

    return {}
}
