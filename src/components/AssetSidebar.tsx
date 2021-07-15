import { useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Table, Button } from '@geist-ui/react'
import BigNumber from 'bignumber.js'
import { formatter } from '../utils'
import useTxHistory from '../hooks/useTxHistory'
import { useActiveWeb3React } from '../hooks'
import { LendingContext } from '../pages/lend'
import Sidebar from './Sidebar'

export default function AssetSidebar({ open, hide, markets }) {
    const [balances, setBalances] = useState([])
    const transactions = useTxHistory()
    const { account } = useActiveWeb3React()

    const { showStakingSidebar, setShowStakingSidebar, stakingSidebarSlug, setStakingSidebarSlug } = useContext(LendingContext)

    const openStaking = (slug) => {
        setStakingSidebarSlug(slug)
        setShowStakingSidebar(true)
    }

    const sortFunc = (a, b) => {
        if (!a?.borrowBalance || !b?.supplyBalance) {
            return 0
        }
        return b.borrowBalance.plus(b.supplyBalance).times(b.underlyingPriceUSD).minus(a.borrowBalance.plus(a.supplyBalance).times(a.underlyingPriceUSD)).toNumber()
    }

    useEffect(() => {
        if (markets && account) {
            const temp = markets /* filter(market => (market.borrowBalance.gt(0) || market.supplyBalance.gt(0))) */
                .sort(sortFunc)
                .map((elem) => ({
                    asset: elem.underlyingSymbol,
                    totalBorrowed: `$${formatter((elem.borrowBalance || new BigNumber(0)).times(elem.underlyingPriceUSD).toString(10), 2)}`,
                    totalLent: `$${formatter((elem.supplyBalance || new BigNumber(0)).times(elem.underlyingPriceUSD).toString(10), 2)}`,
                    stakeButton: (
                        <div className="flex w-full justify-end">
                            <Button onClick={() => openStaking(elem.underlyingSymbol)} auto size="mini">
                                Stake {elem.underlyingSymbol}
                            </Button>
                        </div>
                    )
                }))

            setBalances(temp)
        }
    }, [markets, account])

    return (
        <>
            <AnimatePresence>
                <Sidebar {...{ open, hide }} className="z-30">
                    <div className="p-6 md:p-12 space-y-8 border-b overflow-y-auto">
                        <div className="space-y-2">
                            <p className="text-3xl font-extrabold">Your Assets</p>
                            <p className="opacity-50">Track your coin flow on Scream.</p>
                        </div>

                        <div className="overflow-x-auto">
                            <Table data={balances}>
                                <Table.Column prop="asset" label="Asset" />
                                <Table.Column prop="totalBorrowed" label="Total Borrowed" />
                                <Table.Column prop="totalLent" label="Total Lent" />
                                <Table.Column prop="stakeButton" label="Stake" />
                            </Table>
                        </div>
                    </div>

                    <div className="p-6 md:p-12 space-y-8 overflow-auto flex-1">
                        <div className="space-y-2">
                            <p className="text-3xl font-extrabold">Your Transactions</p>
                            <p className="opacity-50">Track your activity on Scream.</p>
                        </div>

                        <Table data={transactions}>
                            <Table.Column prop="detail" label="Details" />
                            <Table.Column prop="date" label="Date" />
                            <Table.Column prop="txHash" label="Explorer" />
                        </Table>
                    </div>
                </Sidebar>
            </AnimatePresence>
        </>
    )
}
