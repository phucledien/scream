import { useEffect, useState } from 'react'
import { Button, Input, Select } from '@geist-ui/react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Stats from '../components/Stats'
import useStake from '../hooks/useStake'
import StakeHeader from '../components/StakeHeader'

export default function App() {
    // 1. Add Max button for inputs
    // 2. Get rid of or fix your overview and total supply/total borrow
    const { stake, unstake, screamBalance, xscreamBalance, totalSupply, shareValue, xScreamAPY } = useStake()

    const [stakeInput, setStakeInput] = useState<any>('')
    const [unstakeInput, setUnStakeInput] = useState<any>('')

    return (
        <>
            <Header />
            <StakeHeader />
            <div className="max-w-5xl p-6 pb-12 mx-auto md:p-12 md:pb-24">
                <div className="space-y-6 md:space-y-12">
                    <div className="w-full asd">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            <div className="flex-1 p-2 shadow-xl md:col-span-2 rounded-xl bg-animated-rainbow">
                                <div className="p-6 bg-white shadow-xl rounded-xl">
                                    <div className="space-y-1">
                                        <p className="text-lg">Stake SCREAM</p>
                                        <p className="text-4xl font-extrabold">{xScreamAPY}% APY</p>
                                        <p className="font-mono text-xs">{shareValue} SCREAM per xSCREAM</p>
                                    </div>
                                    <div className="flex-1 h-60">&nbsp;</div>
                                    <div className="flex justify-end">
                                        <div className="flex flex-col space-y-2">
                                            {/* <Select width="100%" placeholder="Choose one" onChange={() => {}}>
                                                <Select.Option value="1">3 Months</Select.Option>
                                                <Select.Option value="2">6 months</Select.Option>
                                                <Select.Option value="3">12 months</Select.Option>
                                            </Select> */}
                                            <p className="text-xs font-mono">SCREAM Balance: {screamBalance}</p>

                                            <div className="flex space-x-2 items-center">
                                                <Input width="100%" value={stakeInput} onChange={(e) => setStakeInput(e.target.value)} type="number" placeholder="0.00" size="small" />

                                                <Button onClick={() => setStakeInput(screamBalance)} type="secondary" auto size="small">
                                                    Max
                                                </Button>
                                            </div>

                                            {/* <input className="flex-1 p-2 text-2xl bg-transparent" value={stakeInput} onChange={(e) => setStakeInput(e.target.value)} type="number" placeholder="0.00" /> */}
                                            <Button onClick={() => stake(stakeInput)} type="secondary">
                                                Stake SCREAM
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full col-span-2 lg:col-span-1 flex flex-col p-6 bg-white border border-gray-100 shadow-xl rounded-xl">
                                <div className="flex-1 space-y-1">
                                    <p className="text-lg">UnStake xSCREAM</p>
                                    <p className="text-4xl font-extrabold">Earn SCREAM</p>
                                    <p className="font-mono text-xs">xSCREAM Supply: {totalSupply}</p>
                                </div>
                                <div className="h-60 lg:h-auto" />
                                <div className="max-w-sm ml-auto flex flex-col space-y-2">
                                    {/* <Select width="100%" placeholder="Choose one" onChange={() => {}}>
                                        <Select.Option value="1">3 Months</Select.Option>
                                        <Select.Option value="2">6 months</Select.Option>
                                        <Select.Option value="3">12 months</Select.Option>
                                    </Select> */}
                                    <p className="text-xs font-mono">xSCREAM Balance: {xscreamBalance}</p>

                                    <div className="flex space-x-2 items-center">
                                        <Input width="100%" value={unstakeInput} onChange={(e) => setUnStakeInput(e.target.value)} type="number" placeholder="0.00" size="small" />

                                        <Button onClick={() => setUnStakeInput(xscreamBalance)} type="secondary" auto size="small">
                                            Max
                                        </Button>
                                    </div>

                                    <Button onClick={() => unstake(unstakeInput)} className="flex-1" auto type="secondary">
                                        Unstake xSCREAM
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-12">
                        <BorrowTool />
                        <LendTool />
                    </div>
                    <AssetTable /> */}
                </div>
            </div>
            <Footer />
        </>
    )
}
