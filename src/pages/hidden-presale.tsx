import { Input, Progress, Button, Modal, useToasts } from '@geist-ui/react'
import { useState } from 'react'
import CryptoTicker from '../lib/CryptoTicker/CryptoTicker'
import DisclaimerModal from '../component/DisclaimerModal'
import useWallet from '../hooks/useWallet'
import Locker from '../component/Locker'
import Binance from 'binance-api-node'

export default function PresalePage() {
    const [amount, setAmount] = useState(0)

    const [, setToast] = useToasts()
    const wallet = useWallet()
    const { send } = wallet

    const onSubmit = async () => {
        try {
            await send(amount)
            setToast({ text: 'Success! You have claimed your allotment.' })
        } catch (error) {
            setToast({ text: 'An error occurred while processing the transaction.', type: 'error' })
        }
    }

    const maxAllotment = 1500
    const binance = Binance()
    const [tokenPrice, setNum] = useState(0)
  
    const getBnbPrice = async () => {
        let ticker = await binance.prices({ symbol: 'FTMUSDT' })
        let price = Number(ticker['FTMUSDT'])
    setNum(price*300)
  }

  getBnbPrice()
    return (
        <>
            <Locker />
            <DisclaimerModal />

            <CryptoTicker visible />

            <div className="min-h-full flex flex-col bg-animated-rainbow">
                <div className="flex-1 flex items-center justify-center p-6 md:p-12">
                    <div className="max-w-5xl w-full  space-y-8">
                        <div>
                            <Button auto size="mini">
                                Scream Home
                            </Button>
                        </div>
                        <div className="text-white space-y-2">
                            <h1 className="text-4xl font-extrabold text-shadow-lg">Community Seed 🌱</h1>
                            <h2 className="text-2xl text-shadow-lg">Only available to Pastel Ticket Holders.</h2>
                        </div>
                        <div className="gap-6 md:gap-12 grid grid-cols-1 md:grid-cols-2">
                            <div className="bg-white shadow-xl w-full rounded-2xl space-y-8 p-6 md:p-12">
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-gray-600">Total Distributed</p>
                                    <Progress type="error" value={21} />
                                </div>
                                <div className="space-y-4">
                                    <div className="text-white flex flex-col md:flex-row md:space-x-2 md:space-y-2 space-y-0">
                                        <div className="flex-1 rounded-2xl bg-blue-400 p-4">
                                            <p className="font-medium">$SCREAM</p>
                                            <p className="text-4xl uppercase font-extrabold">1</p>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <p className="text-gray-300 text-3xl">=</p>
                                        </div>
                                        <div className="flex-1 rounded-2xl bg-red-400 p-4">
                                            <p className="font-medium">$FTM</p>
                                            <p className="text-4xl uppercase font-extrabold">300</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Input width="100%" label="Price" disabled value={tokenPrice} />
                                    <Input width="100%" label="Maximum Allotment" disabled value={maxAllotment} />
                                </div>
                            </div>
                            <div className="bg-white shadow-xl w-full rounded-2xl p-6 md:p-12">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        onSubmit()
                                    }}
                                    className="flex h-full flex-col justify-center space-y-4 relative"
                                >
                                    {!wallet.account && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95 z-20">
                                            <Button
                                                auto
                                                onClick={() => {
                                                    wallet.connect()
                                                }}
                                                type={wallet.status === 'error' ? 'error' : 'default'}
                                            >
                                                {wallet.status === 'error' ? 'Error (Wrong Chain?)' : 'Connect Wallet'}
                                            </Button>
                                        </div>
                                    )}

                                    <p className="text-3xl text-center font-extrabold text-shadow-lg">Swap</p>

                                    <p className="text-xs text-center">
                                        You will recieve <b>{amount / 300 || 0} $SCREAM</b> for your <b>{amount || 0} $FTM</b>.
                                    </p>
                                    <Input
                                        type="number"
                                        width="100%"
                                        label="Amount"
                                        placeholder="Enter an amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value > maxAllotment ? maxAllotment : e.target.value)}
                                    />

                                    <div className="flex">
                                        <Button className="flex-1" auto disabled={!amount} htmlType="submit" type="secondary">
                                            Deposit
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
