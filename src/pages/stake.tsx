import { Button, Select } from '@geist-ui/react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Stats from '../components/Stats'

export default function App() {
    return (
        <>
            <Header />
            <Stats />
            <div className="max-w-5xl mx-auto p-6 pb-12 md:p-12 md:pb-24">
                <div className="space-y-6 md:space-y-12">
                    <div className="w-full asd">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 rounded-xl shadow-xl p-2 flex-1 bg-animated-rainbow">
                                <div className="bg-white p-6 shadow-xl rounded-xl">
                                    <div className="space-y-1">
                                        <p className="text-lg">Stake SCREAM</p>
                                        <p className="text-4xl font-extrabold">Earn FTM</p>
                                        <p className="">26% APY</p>
                                    </div>
                                    <div className="h-60 flex-1">&nbsp;</div>
                                    <div className="flex justify-end">
                                        <div className="flex flex-col space-y-2">
                                            <Select width="100%" placeholder="Choose one" onChange={() => {}}>
                                                <Select.Option value="1">3 Months</Select.Option>
                                                <Select.Option value="2">6 months</Select.Option>
                                                <Select.Option value="3">12 months</Select.Option>
                                            </Select>
                                            <Button size="large" type="secondary">
                                                Stake SCREAM
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col rounded-xl shadow-xl bg-white p-6 border border-gray-100">
                                <div className="space-y-1 flex-1">
                                    <p className="text-lg">Stake FTM</p>
                                    <p className="text-4xl font-extrabold">Earn SCREAM</p>
                                    <p className="">12% APY</p>
                                </div>
                                <div className="flex flex-col  space-y-2">
                                    <Select width="100%" placeholder="Choose one" onChange={() => {}}>
                                        <Select.Option value="1">3 Months</Select.Option>
                                        <Select.Option value="2">6 months</Select.Option>
                                        <Select.Option value="3">12 months</Select.Option>
                                    </Select>
                                    <Button className="flex-1" auto size="large" type="secondary">
                                        Stake FTM
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
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
