import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Divider } from '@geist-ui/react'
import dynamic from 'next/dynamic'
import AssetTable from './AssetTable'
import BorrowTool from './BorrowTool'
import Footer from './Footer'
import LendTool from './LendTool'
import TokenPercentageBar from './TokenPercentageBar'
import LiqudityTable from './LiqudityTable'

const ConnectWalletButton = dynamic(() => import('../components/ConnectWalletButton'), { ssr: false })

export default function Stats() {
    const [expand, setExpand] = useState(false)

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
                                <p className="text-3xl">$43,543,234</p>
                            </div>
                            <div className="space-y-1">
                                <TokenPercentageBar src="" name="TST" value={40} />
                                <TokenPercentageBar src="" name="CSP" value={30} />
                                <TokenPercentageBar src="" name="GS" value={18} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-lg font-bold">Total Borrow</p>
                                <p className="text-3xl">$743,656,234</p>
                                <div />
                            </div>
                            <div className="space-y-1">
                                <TokenPercentageBar src="" name="FYW" value={86} />
                                <TokenPercentageBar src="" name="CHE" value={12} />
                                <TokenPercentageBar src="" name="KEC" value={2} />
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
                                    <LiqudityTable />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
