import { Button } from '@geist-ui/react'
import useRewards from '../hooks/useRewards'

export default function RewardsBubble() {
    const { rewardValue, claimAll } = useRewards()

    return (
        <div className="bg-animated-rainbow rounded-2xl p-1 shadow-xl">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col md:flex-row flex-wrap items-center space-x-2 space-y-2 md:space-y-0 md:space-x-2">
                    <p className="">
                        <span className="text-xs sm:text-base font-mono inline">Current Rewards: {rewardValue} SCREAM</span>
                        <img className="ml-2 inline w-6 animate-spin" src="/img/tokens/scream.png" alt="" />
                    </p>
                    <div className="flex-1"></div>
                    <Button onClick={() => claimAll()} type="secondary" auto>
                        Claim Your Rewards
                    </Button>
                </div>
            </div>
        </div>
    )
}
