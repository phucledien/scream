import { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Divider } from '@geist-ui/react'
import dynamic from 'next/dynamic'
import BigNumber from 'bignumber.js'
import classNames from 'classnames'
import TokenPercentageBar from './TokenPercentageBar'
import LiqudityTable from './LiqudityTable'
import { currencyFormatter } from '../utils'
import { LendingContext } from '../pages/lend'
import { useActiveWeb3React } from '../hooks'
import useMarkets from '../hooks/useMarkets'

// const ConnectWalletButton = dynamic(() => import('./WalletConnect/ConnectWalletButton'), { ssr: false })

export default function StakeHeader({ markets }) {
    const [expand, setExpand] = useState(false)
    const [totalSupply, setTotalSupply] = useState(0)
    const [totalBorrows, setTotalBorrows] = useState(0)
    const [sortedBySupply, setSortedBySupply] = useState([])
    const [sortedByBorrows, setSortedByBorrows] = useState([])

    const { refreshing } = useMarkets()

    const { setShowSidebar } = useContext(LendingContext)

    const { account } = useActiveWeb3React()

    useEffect(() => {
        if (markets && markets?.length) {
            const tempTS = (markets || []).reduce((accumulator, market) => new BigNumber(accumulator).plus(new BigNumber(market.totalSupplyUsd)), new BigNumber(0))
            const tempTB = (markets || []).reduce((accumulator, market) => new BigNumber(accumulator).plus(new BigNumber(market.totalBorrowsUsd)), new BigNumber(0))
            setTotalBorrows(tempTB?.dp(2, 1).toString(10))
            setTotalSupply(tempTS?.dp(2, 1).toString(10))

            setSortedBySupply([...markets].sort((a, b) => b?.totalSupplyUsd - a?.totalSupplyUsd))
            setSortedByBorrows([...markets].sort((a, b) => b?.totalBorrowsUsd - a?.totalBorrowsUsd))
        }
    }, [markets])

    return (
        <div className="relative">
            <div className="absolute z-0 inset-0 bg-gray-100 transform -translate-y-1/4" />
            <div className="relative max-w-5xl mx-auto px-6 pt-6 md:px-12 md:pt-12 space-y-6">
                <div className="flex items-center space-x-2">
                    {/* {account && (
                        <>
                            <Button type="secondary" onClick={() => setShowSidebar(true)} size="small" auto>
                                Your Overview
                            </Button>
                        </>
                    )} */}

                    <div className="flex-1" />
                    <div className="flex justify-end items-center space-x-4">
                        <img className="hidden sm:block w-40" src="https://scream.sh/img/scream-logotype.png" alt="" />
                        <img className={classNames('w-8', refreshing && 'animate-spin')} src="https://scream.sh/img/scream-multi.png" alt="" />
                    </div>
                </div>
                <motion.div className="relative bg-white rounded-xl p-6 shadow-xl space-y-6">
                    <div>
                        <p className="text-5xl font-extrabold">Stake your SCREAM.</p>
                        <p className="text-4xl">Earn rewards.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
