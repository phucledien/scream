import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HomeIcon, MenuAlt3Icon } from '@heroicons/react/solid'
import ConnectWalletButton from './WalletConnect/ConnectWalletButton'

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

    return (
        <div className="relative bg-animated-rainbow pb-1 shadow-md z-10">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        style={{ overflow: 'hidden' }}
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="md:hidden bg-white border-b border-color-100 p-6 flex flex-col space-y-2"
                    >
                        <Link href="/apps">
                            <a className="text-3xl font-extrabold">All Apps</a>
                        </Link>
                        <Link href="/">
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

                    {/* <p className="hidden md:block text-xs font-mono">$12.23 💚</p> */}
                    <div className="hidden md:block">
                        <ConnectWalletButton />
                    </div>

                    <button className="md:hidden" type="button" onClick={() => setIsExpanded((_) => !_)}>
                        <MenuAlt3Icon className={classNames('w-4 transform ease-in-out duration-300', isExpanded && 'rotate-90')} />
                    </button>
                </div>
            </div>
        </div>
    )
}
