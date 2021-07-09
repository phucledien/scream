import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Divider } from '@geist-ui/react'
import dynamic from 'next/dynamic'
import TokenPercentageBar from './TokenPercentageBar'
import LiqudityTable from './LiqudityTable'
import useMarkets from '../hooks/useMarkets'
import BigNumber from 'bignumber.js'
import { currencyFormatter } from '../utils'

const ConnectWalletButton = dynamic(() => import('../components/WalletConnect/ConnectWalletButton'), { ssr: false })

export default function Stats() {
    const [expand, setExpand] = useState(false)
    const [totalSupply, setTotalSupply] = useState(0);
    const [totalBorrows, setTotalBorrows] = useState(0);
    const [sortedBySupply, setSortedBySupply] = useState([]);
    const [sortedByBorrows, setSortedByBorrows] = useState([]);

    const markets = useMarkets();
    
    useEffect(() => {
        if(markets) {
            const tempTS = (markets || []).reduce((accumulator, market) => {
                return new BigNumber(accumulator).plus(
                  new BigNumber(market.totalSupplyUsd)
                );
            }, new BigNumber(0));
            const tempTB = (markets || []).reduce((accumulator, market) => {
                return new BigNumber(accumulator).plus(
                    new BigNumber(market.totalBorrowsUsd)
                );
            }, new BigNumber(0));
            setTotalBorrows(tempTB?.dp(2,1).toString(10))
            setTotalSupply(tempTS?.dp(2,1).toString(10))

            setSortedBySupply((markets || []).sort((a, b) => (+a?.totalSupplyUsd >= +b?.totalSupplyUsd)))
            setSortedByBorrows((markets || []).sort((a, b) => (+a?.totalBorrowsUsd >= +b?.totalBorrowsUsd)))
        }
    }, [markets])

    return (
        <div className="relative">
            <div className="absolute z-0 inset-0 bg-gray-100 transform -translate-y-1/4" />
            <div className="relative max-w-5xl mx-auto px-6 pt-6 md:px-12 md:pt-12 space-y-6">
                <div className="flex">
                    <ConnectWalletButton />
                    <div className="flex-1" />
                    <div className="flex justify-end items-center space-x-4">
                        <img className="w-40" src="https://scream.sh/img/scream-logotype.png" alt="" />
                        <img className="w-8 animate-spin" src="https://scream.sh/img/scream-multi.png" alt="" />
                    </div>
                </div>
                <motion.div className="relative bg-white rounded-xl p-6 shadow-xl space-y-6">
                    <div className="p-2 absolute top-0 right-0">
                        <Button onClick={() => setExpand((_) => !_)} size="mini" auto>
                            Expand
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-lg font-bold">Total Supply</p>
                                <p className="text-3xl">${`${currencyFormatter(totalSupply)}`}</p>
                            </div>
                            <div className="space-y-1">
                                {sortedBySupply && sortedBySupply.length > 0 && sortedBySupply.slice(0, 3).map(market => (
                                    <TokenPercentageBar key={market?.id} src="" name={market?.underlyingSymbol} value={+totalSupply == 0 ? 0 : (market?.totalSupplyUsd / totalSupply * 100)} />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-lg font-bold">Total Borrow</p>
                                <p className="text-3xl">${`${currencyFormatter(totalBorrows)}`}</p>
                                <div />
                            </div>
                            <div className="space-y-1">
                                {sortedByBorrows && sortedByBorrows.length > 0 && sortedByBorrows.slice(0, 3).map(market => (
                                    <TokenPercentageBar key={market?.id} src="" name={market?.underlyingSymbol} value={+totalBorrows == 0 ? 0 : (market?.totalBorrowsUsd / totalBorrows * 100)} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <AnimatePresence>
                            {expand && (
                                <motion.div
                                    className="overflow-hidden"
                                    key="content"
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    variants={{
                                        open: { opacity: 1, height: 'auto' },
                                        collapsed: { opacity: 0, height: 0 }
                                    }}
                                >
                                    <LiqudityTable markets={markets}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
