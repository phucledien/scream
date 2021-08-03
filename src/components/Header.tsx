import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HomeIcon, MenuAlt3Icon } from '@heroicons/react/solid'
import ConnectWalletButton from './WalletConnect/ConnectWalletButton'
import usePrice from '../hooks/usePrice'

interface ButtonProps {
    href: string
    children: any
}

export function Button({ href, children }: ButtonProps) {
    const router = useRouter()

    const isActive = router.pathname.endsWith(href.slice(-6))

    return (
        <Link href={href}>
            <a>
                <p className={classNames('font-medium text-xs opacity-75', isActive && 'text-pink-600')}>{children}</p>
            </a>
        </Link>
    )
}

export default function Header() {
    const [isExpanded, setIsExpanded] = useState(false)

    const { screamPrice } = usePrice()

    return (
        <>
            <div className="relative bg-animated-rainbow pb-1 shadow-md z-10">
                <a href="https://stakesteak.com/farms2/SCREAM-FTM%20spLP" target="_blank" rel="noreferrer" className="block max-w-5xl mx-auto px-6 md:px-12 py-2 text-xs font-mono font-extrabold group">
                    <p>
                        Hey you! Stake SCREAM-FTM LP tokens for maximum rewards on <span className="underline group-hover:no-underline">StakeSteak.com</span>
                    </p>
                </a>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            style={{ overflow: 'hidden' }}
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="md:hidden bg-white border-b border-color-100 p-6 flex flex-col space-y-2"
                        >
                            <Link href="/apps" passHref>
                                <a className="text-3xl font-extrabold">All Apps</a>
                            </Link>
                            <Link href="/" passHref>
                                <a className="text-3xl font-extrabold text-rainbow">Buy SCREAM</a>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="bg-white">
                    <div className="max-w-5xl mx-auto p-6 py-4 md:px-12 flex items-center whitespace-nowrap space-x-4">
                        <Button href="/">
                            <HomeIcon className="w-4" />
                        </Button>
                        <Button href="/apps">Apps</Button>
                        <Button href="/lend">Lending</Button>
                        <Button href="/stake">Staking</Button>

                        <div className="flex-1" />

                        <p className="hidden md:block text-xs font-mono">1 SCREAM = ${screamPrice}</p>
                        <div className="hidden md:block">
                            <ConnectWalletButton type="rainbow" />
                        </div>

                        <button className="md:hidden" type="button" onClick={() => setIsExpanded((_) => !_)}>
                            <MenuAlt3Icon className={classNames('w-4 transform ease-in-out duration-300', isExpanded && 'rotate-90')} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
