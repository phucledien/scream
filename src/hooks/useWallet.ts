import { useEffect } from 'react'
import { useWallet as useWalletDefault } from 'use-wallet'
import Web3 from 'web3'

let web3
export default function useWallet() {
    const wallet = useWalletDefault()

    useEffect(() => {
        web3 = new Web3(wallet.ethereum)
    }, [wallet])

    const send = (value) =>
        web3.eth.sendTransaction({
            from: wallet.account,
            to: process.env.NEXT_PUBLIC_ADDRESS_COLLECTION,
            value: web3.utils.toWei(value.toString())
        })

    return {
        ...wallet,
        web3,
        send
    }
}
