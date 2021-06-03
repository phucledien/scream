import CryptoTicker from '../lib/CryptoTicker/CryptoTicker'
import { Input, Progress, Button, Modal } from '@geist-ui/react'
import DisclaimerModal from '../component/DisclaimerModal'
import { useState } from 'react'

export default function PresalePage() {
    const [amount, setAmount] = useState(null)

    return (
        <>
            <DisclaimerModal />

            <CryptoTicker visible={true} />

            <div className="min-h-full flex flex-col bg-animated-rainbow">
                <div className="flex-1 flex items-center justify-center p-12">
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
                        <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
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
                                            <p className="text-4xl uppercase font-extrabold">1000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Input width="100%" label="Price" disabled value="0.304"></Input>
                                    <Input width="100%" label="Maximum Allotment" disabled value="5000"></Input>
                                </div>
                            </div>
                            <div className="bg-white shadow-xl w-full rounded-2xl p-6 md:p-12">
                                <div className="flex h-full flex-col justify-center space-y-4">
                                    <p className="text-3xl text-center font-extrabold text-shadow-lg">Swap</p>
                                    <Input width="100%" label="Your Bid Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    <Button type="secondary">Deposit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
