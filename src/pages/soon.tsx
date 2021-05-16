import React, { useState } from 'react'
import useCountDown from 'react-countdown-hook'
import Tilt from 'react-parallax-tilt'
import prettyMilliseconds from 'pretty-ms'
import dayjs from 'dayjs'
import ParticlesBackground from '../component/ParticlesBackground'
import SubscribePopup from '../component/SubscribePopup'

const date1 = dayjs('2023-06-05')
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
                    <div className="p-12 flex-1 flex items-center justify-center tilt-inner">
                        <p className="text-7xl font-extrabold rainbow-text">{prettyMilliseconds(timeLeft)}</p>
                    </div>
                    <ParticlesBackground />
                </Tilt>
            </div>
        </>
    )
}
