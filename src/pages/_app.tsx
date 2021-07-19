import { GeistProvider } from '@geist-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Web3ReactProvider } from '@web3-react/core'
import Meta from '../components/Meta'
import { GoogleAnalytics } from '../lib/ga'
import '../styles/global.css'
import getLibrary from '../utils/getLibrary'
import Web3ReactManager from '../components/Web3ReactManager'
import dynamic from 'next/dynamic'
import { UseAlertsWrapper } from '../hooks/useAlerts'

const Web3ReactProviderDefault = dynamic(() => import('../components/Provider'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                    crossOrigin="anonymous"
                />
                <script src="/js/three.min.js" />
                <script src="/js/p5.min.js" />
            </Head>
            <Meta />

            <GoogleAnalytics />
            <GeistProvider>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Web3ReactProviderDefault getLibrary={getLibrary}>
                        <Web3ReactManager>
                            <UseAlertsWrapper>
                                <Component {...pageProps} />
                            </UseAlertsWrapper>
                        </Web3ReactManager>
                    </Web3ReactProviderDefault>
                </Web3ReactProvider>
            </GeistProvider>
        </>
    )
}

// :) :0
