import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Button } from '@geist-ui/react'
import { useWallet } from 'use-wallet'
// const TVChartContainer = dynamic(() => import('../component/TVChartContainer'), { ssr: false })
// test
const TVChartContainer = dynamic(() => import('../components/TVChartContainer'), { ssr: false })

export default function Dashboard() {
    const [hoveredParam, setHoveredParam] = useState(null)

    const wallet = useWallet()

    return (
        <>
            <div className="flex flex-col h-full w-full bg-gray-100 over p-6 space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-white rounded-xl p-2 md:p-4">
                        <p className="text-xs font-medium">Market Cap</p>
                        <p className="text-2xl font-extrabold">$23,313,123.32</p>
                    </div>
                    <div className="bg-white rounded-xl p-2 md:p-4">
                        <p className="text-xs font-medium">Current Price</p>
                        <p className="text-2xl font-extrabold">$23</p>
                    </div>
                    <div className="bg-white rounded-xl p-2 md:p-4 flex items-center">
                        <div className="flex-1">
                            <p className="text-xs font-medium">Your Balance</p>
                            <p className="text-2xl font-extrabold">413 $SCREAM</p>
                        </div>
                        <Button onClick={() => wallet.connect()} auto size="mini" type={wallet.account ? 'default' : 'secondary'}>
                            {wallet.account ? 'Connected' : 'Connect Wallet'}
                        </Button>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 gap-2">
                    <div className="min-h-screen md:min-h-0 md:col-span-4 bg-white rounded-xl overflow-hidden">
                        <TVChartContainer setHoveredParam={setHoveredParam} />
                    </div>

                    <div className="bg-white relative rounded-xl p-6 overflow-hidden flex flex-col space-y-4">
                        <div className="flex-1 overflow-scroll space-y-4">
                            {new Array(100).fill(4).map(() => (
                                <div className="flex items-center border-gray-100 border-b pb-2">
                                    <div className="flex-1">
                                        <p className="text-xs font-bold">June 31st, 12:37 PM</p>
                                        <p className="font-medium">12,000 SCREAM</p>
                                        <p className="text-xs opacity-50 font-medium">@ 1232 FTM/SCREAM</p>
                                    </div>
                                    {/* <p className="text-green-400 text-xs font-extrabold uppercase">+ Buy</p> */}
                                    <p className="text-red-400 text-xs font-extrabold uppercase">- Sell</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="h-full w-full p-6 mx-auto">
                <div className="flex h-full flex-col space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="bg-gray-100 rounded-xl p-6">
                            <p className="text-xs font-medium">Market Cap</p>
                            <p className="text-2xl font-extrabold">$23,313,123.32</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-6">
                            <p className="text-xs font-medium">Current Price</p>
                            <p className="text-2xl font-extrabold">$23</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-6">
                            <p className="text-xs font-medium">Your Balance</p>
                            <p className="text-2xl font-extrabold">413 $SCREAM</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden w-full grid grid-cols-1 md:grid-cols-5 gap-2 min-h-screen md:min-h-0">
                        <div className="min-h-screen md:min-h-0 relative  rounded-xl md:col-span-4 bg-gray-100">
                            <div className="absolute z-10 bottom-0 right-0 p-4">
                                <p className="text-xs">{JSON.stringify(hoveredParam)}</p>
                            </div>
                            <TVChartContainer setHoveredParam={setHoveredParam} />
                        </div>

                        <div>
                            <div className="bg-gray-100 rounded-xl p-6 space-y-4 overflow-scroll">
                                <p className="flex items-center space-x-2 font-extrabold">
                                    <span className="block w-1 h-1 bg-pink-500 animate-ping rounded-full" />
                                    <span>Live Sales Tracker</span>
                                </p>
                                <div className=" ">
                                    {new Array(100).fill(4).map(() => (
                                        <div>
                                            <p className="text-xs font-medium">June 31st, 12:37 PM</p>
                                            <p>12,000 SCREAM</p>
                                            <p className="text-xs opacity-50">@ 1232 FTM/SCREAM</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-gray-100 rounded-xl p-6">DD</div>
                    <div className="bg-gray-100 rounded-xl p-6 md:col-span-2">DD</div>
                    <div className="bg-gray-100 rounded-xl p-6 md:col-span-2">DD</div>
                    <div className="bg-gray-100 rounded-xl p-6">buy token ad</div>
                </div>
                </div>
            </div> */}
        </>
    )
}
