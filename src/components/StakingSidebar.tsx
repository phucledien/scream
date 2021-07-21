import { useContext, useEffect } from 'react'
import { Button } from '@geist-ui/react'
import { LendingContext } from '../pages/lend'
import AssetSidebar from './AssetSidebar'
import Sidebar from './Sidebar'
import useRewards from '../hooks/useRewards'

export default function StakingSidebar({ open, hide }) {
    const { stakingSidebarData } = useContext(LendingContext)

    const { claimReward, rewardValue, lendingApy, borrowApy } = useRewards(stakingSidebarData)

    return (
        <Sidebar {...{ open, hide }} className="z-50">
            <div className="min-h-full overflow-auto">
                <div className="p-6 md:p-12 space-y-8">
                    <div className="space-y-1">
                        <p className="text-4xl font-extrabold">Rewards</p>
                        <p className="text-xl font-medium opacity-50">
                            Claim your rewards on your sc
                            {stakingSidebarData.underlyingSymbol}. Earn SCREAM.
                        </p>
                    </div>
                    <div className="rounded-2xl bg-pink-500 h-60 flex flex-col space-y-2 items-center justify-center text-white">
                        <p className="font-medium text-xl opacity-50">You've earned...</p>
                        <p className="text-4xl font-extrabold">{rewardValue}</p>
                        <p className="text-xl font-extrabold opacity-75">
                            sc
                            {stakingSidebarData.underlyingSymbol}
                        </p>
                    </div>

                    <div className="font-mono opacity-75 space-y-1">
                        <div className="flex items-center space-x-2">
                            <p>Borrow APY</p>
                            <span className="flex-1 border border-dotted border-black" />
                            <p> {borrowApy} % </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <p>Lending APY</p>
                            <span className="flex-1 border border-dotted border-black" />
                            <p> {lendingApy} %</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex md:col-span-2">
                            <Button onClick={claimReward} className="flex-1" type="secondary">
                                Claim Rewards
                            </Button>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs opacity-50 font-mono ">Claiming your rewards will claim all rewards across all tokens.</p>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
