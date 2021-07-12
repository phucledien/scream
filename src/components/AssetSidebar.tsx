import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function AssetSidebar({ open, hide }) {
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
                            <p className="text-4xl font-extrabold">Your Overview on Scream</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
