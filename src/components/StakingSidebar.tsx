import { useContext } from 'react'
import { Button } from '@geist-ui/react'
import { LendingContext } from '../pages/lend'
import AssetSidebar from './AssetSidebar'
import Sidebar from './Sidebar'

export default function StakingSidebar({ open, hide }) {
    const { stakingSidebarSlug } = useContext(LendingContext)

    return (
        <Sidebar {...{ open, hide }} className="z-50">
            <div className="min-h-full overflow-auto">
                <div className="p-6 md:p-12 space-y-8">
                    <div className="space-y-1">
                        <p className="text-4xl font-extrabold">Staking</p>
                        <p className="text-xl font-medium opacity-50">
                            Stake your sc
                            {stakingSidebarSlug}. Earn SCREAM.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-pink-500 h-60 flex flex-col space-y-2 items-center justify-center text-white">
                        <p className="font-medium text-xl opacity-50">You've earned...</p>
                        <p className="text-4xl font-extrabold">3,000</p>
                        <p className="text-xl font-extrabold opacity-75">
                            sc
                            {stakingSidebarSlug}
                        </p>
                    </div>

                    <div className="font-mono opacity-75 space-y-1">
                        <div className="flex items-center space-x-2">
                            <p>Average APY %</p>
                            <span className="flex-1 border border-dotted border-black" />
                            <p>4232.23% APY</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p>Another Stat</p>
                            <span className="flex-1 border border-dotted border-black" />
                            <p>2,123,231</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button>Deposit</Button>
                        <Button>Withdraw</Button>
                        <div className="flex md:col-span-2">
                            <Button className="flex-1" type="secondary">
                                Claim Rewards
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
