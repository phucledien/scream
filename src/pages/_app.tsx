import { GeistProvider } from '@geist-ui/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { UseWalletProvider } from 'use-wallet'
import Meta from '../components/Meta'
import { GoogleAnalytics } from '../lib/ga'
import '../styles/global.css'

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
            <GeistProvider>
                <UseWalletProvider chainId={250}>
                    <GoogleAnalytics />
                    <Component {...pageProps} />
                </UseWalletProvider>
            </GeistProvider>
        </>
    )
}
