import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import Tilt from 'react-parallax-tilt'
import Typed from 'react-typed'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '@geist-ui/react'
import axios from 'axios'
import ParticlesBackground from '../component/ParticlesBackground'
import Loader from '../component/Loader'
import CryptoTicker from '../lib/CryptoTicker/CryptoTicker'
import useTicker from '../lib/CryptoTicker/useTicker'

export default function App() {
    const [subscribe, setSubscribe] = useState(false)
    const [message, setMessage] = useState('')
    const [subscribeInput, setSubscribeInput] = useState('')
    const [hide, setHide] = useState(false)

    useEffect(() => setTimeout(() => setHide(true), 3000), [])

    const onSubmit = async () => {
        try {
            await axios.post('/api/subscribe', { email: subscribeInput })
            setMessage('You have been added to whitelist.')
            alert('You have been added to whitelist.')
            setSubscribe(false)
            setSubscribeInput('')
        } catch (error) {
            console.log(error)
            setMessage('An errorr occurred. Either you are already subscribed, or a problem occuured. Try with another email or come back later!')
            alert('An errorr occurred. Either you are already subscribed, or a problem occuured. Try with another email or come back later!')
        }
    }

    return (
        <>
            <AnimatePresence>
                {subscribe && (
                    <motion.div initial={{ y: '100%' }} animate={{ y: ['100%', '0%'] }} exit={{ y: ['0%', '100%'] }} transition={{ duration: 0.2 }} className="absolute z-50 bottom-0 right-0 px-6 md:px-12">
                        <div className="bg-white rounded-b-none overflow-hidden max-w-xs border-rainbow border-2 border-b-0">
                            <div className="bg-animated-rainbow px-4 py-2 flex items-center text-white">
                                <p className="font-bold text-xs flex-1">Subscribe</p>
                                <button type="submit" onClick={() => setSubscribe((_) => !_)}>
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                            <form
                                className="p-4 space-y-2"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    onSubmit()
                                }}
                            >
                                <p className="text-sm">
                                    <span className="font-medium">
                                        Be the first to know when the <span className="font-extrabold rainbow-text">SCREAM</span> protocol is live.{' '}
                                    </span>
                                    <span>Join to become whitelisted.</span>
                                </p>
                                <Input width="100%" type="email" value={subscribeInput} onChange={(e) => setSubscribeInput(e.target.value)} label="Email" placeholder="Enter your email" a />
                                {/* <p className="text-xs">Or join us on Discord</p> */}
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-full flex flex-col">
                <CryptoTicker visible={hide} />

                <Tilt className="tilt  relative z-30 flex flex-col flex-1">
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
                                                <div className="text-2xl sm:text-4xl font-bold ">
                                                    <p className="rainbow-text">Scream is a highly scalable decentralized lending protocol powered by </p>
                                                    <a href="https://fantom.foundation" target="_blank" rel="noreferrer" className="inline whitespace-nowrap hover:underline" style={{ color: '#13b5ec' }}>
                                                        <img className="inline-block align-middle h-6 mr-1" src="/img/fantom-logo.svg" alt="" />
                                                        fantom.
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right space-y-4">
                                                <div>
                                                    <button
                                                        onClick={() => setSubscribe((_) => !_)}
                                                        type="button"
                                                        className="bg-animated-rainbow font-bold rounded-3xl px-8 py-4 text-2xl w-full animate-ping text-white hover:shadow-xl transition ease-in-out duration-150 "
                                                    >
                                                        <i className="fas fa-ghost mr-2 " />
                                                        <span>Open App</span>
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <button
                                                        onClick={() => setSubscribe((_) => !_)}
                                                        type="button"
                                                        className="bg-animated-rainbow font-medium rounded-3xl px-4 py-2 w-full animate-ping text-white hover:shadow-xl transition ease-in-out duration-150"
                                                    >
                                                        <span>Docs</span>
                                                    </button>
                                                    <button
                                                        onClick={() => setSubscribe((_) => !_)}
                                                        type="button"
                                                        className="bg-animated-rainbow font-medium rounded-3xl px-4 py-2 w-full animate-ping text-white hover:shadow-xl transition ease-in-out duration-150"
                                                    >
                                                        <span>Subscribe</span>
                                                    </button>
                                                </div>
                                                {/* <div>
                                                    <button className="bg-rainbow font-bold rounded-xl px-4 py-2">Docs</button>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="text-xl space-x-2">
                                            <a href="# " target="_blank" rel="noreferrer">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="# " target="_blank" rel="noreferrer">
                                                <i className="fab fa-telegram" />
                                            </a>
                                            <a href="https://discord.gg/MNgU35XfMC" target="_blank" rel="noreferrer">
                                                <i className="fab fa-discord" />
                                            </a>
                                            <a href="# " target="_blank" rel="noreferrer">
                                                <i className="fab fa-github" />
                                            </a>
                                            <a href="# " target="_blank" rel="noreferrer">
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
            </div>
        </>
    )
}
