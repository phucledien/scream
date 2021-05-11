import React from 'react'
import Ticker from 'react-ticker'
import ParticlesBackground from '../component/ParticlesBackground'

export default function App() {
    const tokens = [1, 2, 3, 4, 5]

    return (
        <>
            <div className="relative z-10 h-full w-full flex items-center justify-center p-12">
                <div className="max-w-xl w-full space-y-8">
                    <div className="">
                        <img className="w-auto" src="/img/scream-logotype.png" alt="" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <p className="text-2xl font-bold">Scream is a AMM yield generator and lending protocol powered by fantom.</p>
                        </div>
                        {/* <div className="text-right">
                            <p className="text-2xl font-bold">Scream is a AMM yield generator and lending protocol powered by fantom.</p>
                        </div> */}
                        {/* <div>123</div> */}
                    </div>
                </div>
            </div>
            <ParticlesBackground />
        </>
    )
}
