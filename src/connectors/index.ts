import { ethers } from "ethers"
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { NetworkConnector } from './NetworkConnector'


export const NETWORK_CHAIN_ID: number = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '250')

if (typeof process.env.NEXT_PUBLIC_NETWORK_URL === 'undefined') {
  throw new Error(`NEXT_PUBLIC_NETWORK_URL must be a defined environment variable`)
}

export enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
}


export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: process.env.NEXT_PUBLIC_NETWORK_URL },
})

let networkLibrary: ethers.providers.Web3Provider | undefined
export function getNetworkLibrary(): ethers.providers.Web3Provider {
  // eslint-disable-next-line no-return-assign
  return (networkLibrary = networkLibrary ?? new ethers.providers.Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [250],
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: process.env.NEXT_PUBLIC_NETWORK_URL },
  bridge: 'https://staging.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: process.env.NEXT_PUBLIC_NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg',
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
}
