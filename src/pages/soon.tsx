import React, { useState } from 'react'
import useCountDown from 'react-countdown-hook'
import prettyMilliseconds from 'pretty-ms'
import dayjs from 'dayjs'
import Typed from 'react-typed'
import ParticlesBackground from '../components/ParticlesBackground'
import SubscribePopup from '../components/SubscribePopup'
import dynamic from 'next/dynamic'

const Tilt = dynamic(import('react-parallax-tilt'), { ssr: false })


const date1 = dayjs('2021-05-21T19:00:00-01:00')
const date2 = dayjs(Date.now())

const initialTime = date1.diff(date2)
const interval = 100 // interval to change remaining time amount, defaults to 1000

export default function App() {
    const [subscribe, setSubscribe] = useState(true)

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval)

    // start the timer during the first render
    React.useEffect(() => {
        start()
    }, [])

    return (
        <>
            <SubscribePopup visible={subscribe} hide={() => setSubscribe(false)} />

            <div className="h-full flex flex-col fixed inset-0" onClick={() => setSubscribe((_) => !_)}>
                <Tilt className="tilt relative z-30 flex flex-col flex-1">
                    <div className="p-12 flex-1 flex items-center justify-center tilt-inner ">
                        <div className="space-y-8 text-center">
                            <Typed className="text-rainbow font-mono text-xl" strings={['Something is happening.']} typeSpeed={40} />
                            <p className="text-6xl md:text-7xl font-extrabold text-rainbow">{prettyMilliseconds(timeLeft)}</p>
                        </div>
                    </div>
                    <ParticlesBackground />
                </Tilt>
            </div>
        </>
    )
}
