import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import Tilt from 'react-tilt'
import Typed from 'react-typed'
import ParticlesBackground from '../component/ParticlesBackground'
import Loader from '../component/Loader'

export default function App() {
    const [hide, setHide] = useState(false)

    useEffect(() => setTimeout(() => setHide(true), 3000), [])

    return (
        <>
            {/* <Loader /> */}
            <div className="relative z-10 h-full w-full flex items-center justify-center p-12">
                <div className="max-w-xl w-full space-y-8 tilt-inner">
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
                    {hide && (
                        <>
                            <div className="">
                                <img className="w-auto" src="/img/scream-logotype.png" alt="" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-2xl font-bold rainbow-text">Scream is a AMM yield generator and lending protocol powered by fantom.</p>
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
                        </>
                    )}
                </div>
            </div>
            <ParticlesBackground />
        </>
    )
}
