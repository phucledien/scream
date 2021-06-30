import { Button } from '@geist-ui/react'
import { useWallet } from 'use-wallet'

export default function ConnectWalletButton() {
    const wallet = useWallet()

    const shortAddress = wallet.account ? `${wallet.account.slice(0, 6)}...${wallet.account.slice(-6)}` : null

    return (
        <Button onClick={() => wallet.connect()} auto size="medium">
            {shortAddress || 'Connect Wallet'}
        </Button>
    )
}
