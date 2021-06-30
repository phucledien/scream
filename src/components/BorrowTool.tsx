import { Button, Select, Input } from '@geist-ui/react'
import { useState } from 'react'
import ToolWrapper from './ToolWrapper'

export default function BorrowTool() {
    const tabs = [{ slug: 'borrow' }, { slug: 'repay' }]
    const [tab, setTab] = useState(0)
    const activeTab = tabs[tab]

    return (
        <ToolWrapper title="Borrow Assets">
            <div className="border-b border-gray-100 flex">
                <button onClick={() => setTab(0)} type="button" className={`flex-1 py-2 text-xs font-medium border-r ${activeTab.slug === 'borrow' ? 'bg-white' : 'bg-gray-50'}`}>
                    Borrow
                </button>
                <button onClick={() => setTab(1)} type="button" className={`flex-1 py-2 text-xs font-medium ${activeTab.slug === 'repay' ? 'bg-white' : 'bg-gray-100'}`}>
                    Repay
                </button>
                {/* <button className="border border-b-0 rounded rounded-b-none px-2 py-1">123</button> */}
            </div>
            <div className="p-6">
                {activeTab.slug === 'repay' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center">
                            <p className="text-xl font-bold flex-1">Repay Loaned Assets</p>

                            <Select placeholder="Frameworks">
                                <Select.Option value="react">React</Select.Option>
                                <Select.Option value="angular">Angular</Select.Option>
                                <Select.Option divider />
                                <Select.Option value="rails">Rails</Select.Option>
                                <Select.Option value="sinatra">Sinatra</Select.Option>
                            </Select>
                        </div>

                        <div className="rounded-xl bg-pink-500 text-white p-4 text-xs">
                            <p className="flex">
                                <span className="opacity-50 flex-1">You owe</span>
                                <span>0</span>
                            </p>
                            <p className="flex">
                                <span className="opacity-50 flex-1">Your Collateral</span>
                                <span>0</span>
                            </p>
                        </div>

                        <div>
                            <Input label="Amount" size="large" width="100%" placeholder="Enter an amount" />
                        </div>

                        <div className="flex">
                            <Button auto className="flex-1" type="secondary">
                                Connect Wallet
                            </Button>
                        </div>

                        <div className="rounded-xl bg-black text-white p-4 text-xs">
                            <p className="flex">
                                <span className="opacity-50 flex-1">Balance</span>
                                <span className="">-</span>
                            </p>
                            <p className="flex">
                                <span className="opacity-50 flex-1">Liquidity Available</span>
                                <span className="">-</span>
                            </p>
                        </div>
                    </div>
                )}
                {activeTab.slug === 'borrow' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center">
                            <p className="text-xl font-bold flex-1">Borrow Assets</p>

                            <Select placeholder="Frameworks">
                                <Select.Option value="react">React</Select.Option>
                                <Select.Option value="angular">Angular</Select.Option>
                                <Select.Option divider />
                                <Select.Option value="rails">Rails</Select.Option>
                                <Select.Option value="sinatra">Sinatra</Select.Option>
                            </Select>
                        </div>

                        <div>
                            <Input label="Amount" size="large" width="100%" placeholder="Enter an amount" />
                        </div>

                        <div className="flex">
                            <Button auto className="flex-1" type="secondary">
                                Connect Wallet
                            </Button>
                        </div>

                        <div className="rounded-xl bg-black text-white p-4 text-xs">
                            <p className="flex">
                                <span className="opacity-50 flex-1">Borrow APR</span>
                                <span className="">-</span>
                            </p>
                            {/* <p className="flex">
                        <span className="opacity-50 flex-1">LTV</span>
                        <span className="">-</span>
                    </p>
                    <p className="flex">
                        <span className="opacity-50 flex-1">LBV</span>
                        <span className="">-</span>
                    </p> */}
                            <p className="flex">
                                <span className="opacity-50 flex-1">Liquidity Available</span>
                                <span className="">-</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolWrapper>
    )
}
