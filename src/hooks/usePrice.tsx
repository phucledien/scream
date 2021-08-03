import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { getRouterContract } from '../utils/ContractService'
import { useActiveWeb3React } from '.'

export default function usePrice() {
    const [screamPrice, setScreamPrice] = useState(0)
    const { account, library } = useActiveWeb3React()
    const routerContract = getRouterContract(library?.getSigner())
    // const screamAddress = '0xe0654C8e6fd4D733349ac7E09f6f23DA256bF475'
    const wftmAddress = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
    const usdcAddress = '0x04068da6c83afcfa0e13ba15a6696662335d5b75'

    useEffect(() => {
        if (account) {
            const fetchPrice = async () => {
                const prices = await routerContract.getAmountsOut('1000000000000000000', [wftmAddress, usdcAddress])
                const price = Number(prices[prices.length - 1]) / 1000000
                setScreamPrice(price)
            }

            fetchPrice()
        }
    }, [account])

    return {
        screamPrice
    }
}
