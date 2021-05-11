import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import Tilt from 'react-parallax-tilt'
import Typed from 'react-typed'
import { motion, AnimatePresence } from 'framer-motion'
import ParticlesBackground from '../component/ParticlesBackground'
import Loader from '../component/Loader'
import CryptoTicker from '../lib/CryptoTicker/CryptoTicker'

export default function App() {
    const [hide, setHide] = useState(false)

    useEffect(() => setTimeout(() => setHide(true), 3000), [])

    return (
        <div className="h-full flex flex-col">
            <Tilt className="tilt  relative z-30 flex flex-col flex-1">
                {/* <div className="max-w-7xl w-full mx-auto px-12 pt-12 tilt-inner">
                    <div className="flex items-center justify-end">
                        <button>Open App</button>
                        <button>Open Docs</button>
                    </div>
                </div> */}
                <div className="p-12 flex-1 flex items-center justify-center tilt-inner">
                    <motion.div layout className="max-w-xl w-full space-y-8">
                        {!hide && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <img className="block w-16 animate-spin mx-auto" src="/img/scream-multi.png" alt="" />
                                </div>
                                <div>
                                    <Typed className="rainbow-text font-mono text-center" strings={['Scream is loading...']} typeSpeed={40} />
                                </div>
                            </div>
                        )}
                        <AnimatePresence>
                            {hide && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="space-y-8">
                                    <div className="">
                                        <img className="w-auto" src="/img/scream-logotype.png" alt="" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div>
                                            <p className="text-2xl sm:text-4xl font-bold rainbow-text">Scream is a AMM yield generator and lending protocol powered by fantom.</p>
                                        </div>
                                    </div>
                                    <div className="text-xl space-x-2">
                                        <a href="# ">
                                            <i className="fab fa-twitter" />
                                        </a>
                                        <a href="# ">
                                            <i className="fab fa-telegram" />
                                        </a>
                                        <a href="# ">
                                            <i className="fab fa-discord" />
                                        </a>
                                        <a href="# ">
                                            <i className="fab fa-github" />
                                        </a>
                                        <a href="# ">
                                            <i className="fab fa-medium" />
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                <ParticlesBackground />
            </Tilt>

            <AnimatePresence>
                {hide && (
                    <motion.div animate={{ y: ['100%', '0%'] }} className="border-t-4 border-rainbow">
                        <CryptoTicker />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
