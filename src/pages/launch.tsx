import dynamic from 'next/dynamic'
import { useState } from 'react'

// const TVChartContainer = dynamic(() => import('../component/TVChartContainer'), { ssr: false })

const TVChartContainer = dynamic(() => import('../components/TVChartContainer'), { ssr: false })

export default function Dashboard() {
    const [hoveredParam, setHoveredParam] = useState(null)

    return (
        <div className="h-full flex overflow-hidde">
            <div className="h-full w-full p-12 mx-auto">
                <div className="flex h-full flex-col space-y-2">
                    {/* <div className="w-full flex">
                        <img className="w-20" src="https://scream.sh/img/scream-logotype.png" alt="" />
                    </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="bg-gray-100 rounded-2xl p-6">
                            <p className="text-xs font-medium">Market Cap</p>
                            <p className="text-2xl font-extrabold">$23,313,123.32</p>
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-6">
                            <p className="text-xs font-medium">Current Price</p>
                            <p className="text-2xl font-extrabold">$23</p>
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-6">
                            <p className="text-xs font-medium">Your Balance</p>
                            <p className="text-2xl font-extrabold">413 $SCREAM</p>
                        </div>
                    </div>
                    <div className="flex flex-1">
                        <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-2">
                            <div className="relative rounded-2xl md:col-span-4 overflow-hidden bg-gray-100">
                                <div className="absolute z-10 bottom-0 right-0 p-4">
                                    <p className="text-xs">{JSON.stringify(hoveredParam)}</p>
                                </div>
                                <TVChartContainer setHoveredParam={setHoveredParam} />
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-6">live sales</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="bg-gray-100 rounded-2xl p-6">DD</div>
                        <div className="bg-gray-100 rounded-2xl p-6 md:col-span-2">DD</div>
                        <div className="bg-gray-100 rounded-2xl p-6 md:col-span-2">DD</div>
                        <div className="bg-gray-100 rounded-2xl p-6">buy token ad</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
