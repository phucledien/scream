import React, { useState } from 'react'
import useCountDown from 'react-countdown-hook'
import prettyMilliseconds from 'pretty-ms'
import dayjs from 'dayjs'
import Typed from 'react-typed'
import { Button } from '@geist-ui/react'
import dynamic from 'next/dynamic'
import VideoBG from 'react-background-video-player'
import ParticlesBackground from '../components/ParticlesBackground'
import SubscribePopup from '../components/SubscribePopup'

const Tilt = dynamic(import('react-parallax-tilt'), { ssr: false })

const date1 = dayjs('2021-07-23T19:00:00-01:00')
const date2 = dayjs(Date.now())

const initialTime = date1.diff(date2)
const interval = 100 // interval to change remaining time amount, defaults to 1000

export default function App() {
    const [subscribe, setSubscribe] = useState(false)

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval)

    React.useEffect(() => {
        start()
    }, [])

    return (
        <>
            <SubscribePopup visible={subscribe} hide={() => setSubscribe(false)} />

            <div className="h-full flex flex-col fixed inset-0 bg-center bg-cover bg-black" onClick={() => setSubscribe((_) => !_)}>
                <div className="absolute inset-0">
                    <video autoPlay loop muted playsInline className="object-cover h-screen w-screen fixed top-0 left-0">
                        <source src="/img/ScreamFinaltease.mp4" type="video/mp4" />
                    </video>
                </div>
                {/* <Tilt className="tilt relative z-30 flex flex-col flex-1"> */}
                <div className="p-6 flex-1 flex flex-col items-center justify-end tilt-inner text-white space-y-4">
                    <div className="space-y-1 text-center">
                        <p className="text-xs font-mono">
                            <Typed strings={['Pastel Club Members. Get Ready.']} typeSpeed={40} />
                        </p>
                        <p className="text-2xl font-extended md:text-4xl font-extrabold uppercase">{prettyMilliseconds(timeLeft)}</p>
                    </div>
                    <div className="flex-1" />

                    <div className="cursor-not-allowed">
                        <Button className="pointer-events-none" size="small" auto>
                            Open Seed Round
                        </Button>
                    </div>

                    <div className="text-2xl space-x-4">
                        <a href="https://docs.scream.sh/" target="_blank" rel="noreferrer">
                            <i className="fas fa-book" />
                        </a>
                        <a href="https://github.com/Scream-Finance/" target="_blank" rel="noreferrer">
                            <i className="fab fa-github" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
