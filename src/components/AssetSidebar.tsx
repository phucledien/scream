import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Table } from '@geist-ui/react'

export default function AssetSidebar({ open, hide }) {
    const data = [
        {
            asset: 'USDC',
            totalBorrowed: '$100',
            totalLent: '$340'
        },
        {
            asset: 'DAI',
            totalBorrowed: '$100',
            totalLent: '$340'
        },
        {
            asset: 'wFTM',
            totalBorrowed: '$100',
            totalLent: '$340'
        }
    ]

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        onClick={hide}
                        initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
                        animate={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                        exit={{ backgroundColor: 'rgba(255,255,255,0)' }}
                        className="fixed inset-0 z-30"
                    >
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            className="absolute right-0 bg-white max-w-2xl h-full shadow-2xl w-full p-6 md:p-12"
                        >
                            <button onClick={hide} type="button" className="p-6 absolute top-0 right-0">
                                <i className="fa fa-times" />
                            </button>

                            <div className="space-y-8">
                                <p className="text-4xl font-extrabold">Your Overview on Scream</p>
                                <Table data={data}>
                                    <Table.Column prop="asset" label="Asset" />
                                    <Table.Column prop="totalBorrowed" label="Total Borrowed" />
                                    <Table.Column prop="totalLent" label="Total Lent" />
                                </Table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
