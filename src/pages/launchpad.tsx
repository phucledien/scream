import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import ParticlesBackground from '../component/ParticlesBackground'
const BackgroundGlobe = dynamic(() => import('../component/BackgroundGlobe'), { ssr: false })

export default function LaunchPad() {
    return (
        <>
            <div className="relative min-h-full flex items-center justify-center" style={{ backgroundColor: '#f2e4ff' }}>
                {/* <BackgroundGlobe /> */}
                <ParticlesBackground />
                <div className="relative max-w-2xl w-full space-y-6 px-6 py-12 md:p-0">
                    <div className="flex items-center">
                        <div className="space-y-1 flex-1">
                            <p className="text-xs font-medium text-pink-300">Launch an App</p>
                            <h1 className="text-2xl font-bold flex-1">Launchpad</h1>
                        </div>

                        <div>
                            <img className="w-12 animate-spin" src="/img/scream-multi.png" alt="" />
                        </div>
                    </div>
                    <div>
                        <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-300 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Lending</p>
                            <p className="text-xl">Borrow & lend over 10 tokens at the best rates.</p>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-300 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Launchpool</p>
                            <p className="text-xl">Stake your scream tokens. Earn sweet rewards in a token of your choice.</p>
                        </a>

                        <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-300 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Farming</p>
                            <p className="text-xl">Stake your tokens to earn Scream, with the best returns available.</p>
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <a href="# " className="sm:col-span-1 block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-300 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Events</p>
                            <p className="text-xl">The Monster hunt has expired, but something may be brewing...</p>
                        </a>

                        <a href="# " className="sm:col-span-2 block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-150 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Scream, the Game</p>
                            <p className="text-xl">Join in on the fun in the Scream RPF and earn real crypto competing against other members of the Scream community.</p>
                        </a>
                    </div>

                    <div>
                        <a href="# " className="block bg-white rounded-xl shadow-xl hover:shadow border-4 border-white hover:border-pink-200 transition ease-in-out duration-150 p-6 space-y-2">
                            <p className="text-4xl font-extrabold">Scream Merch</p>
                            <p className="text-xl">Love Scream? Show your support and rock some icey colors with Scream Merch. All sizes available.</p>
                        </a>
                    </div>
                    <div className="flex whitespace-no-wrap overflow-auto text-pink-400">
                        <div className="space-x-4">
                            <a className="font-medium" href="# ">
                                Documentation
                            </a>
                            <a className="font-medium" href="# ">
                                Contact Us
                            </a>
                        </div>
                        <span className="flex-1" />
                        <div className="space-x-2">
                            <a href="# ">
                                <i className="fab fa-twitter" />
                            </a>
                            <a href="# ">
                                <i className="fab fa-discord" />
                            </a>
                            <a href="# ">
                                <i className="fab fa-medium" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
