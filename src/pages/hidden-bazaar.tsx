import { Card, Input, Button, Image, Text } from '@geist-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import ProductModal from '../components/ProductModal'
import { products } from '../lib/dummy'
import dynamic from 'next/dynamic'

const Tilt = dynamic(import('react-parallax-tilt'), { ssr: false })


export default function Shop() {
    const [product, setProduct] = useState()

    return (
        <>
            <ProductModal visible={product} hide={() => setProduct(null)} />

            <div className="bg-animated-rainbow whitespace-nowrap overflow-scroll">
                <div className="max-w-7xl mx-auto px-12 py-4 text-white font-medium">
                    <p>Nulla incididunt qui incididunt culpa enim Lorem labore ipsum ut esse.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-12">
                <div className="flex items-center">
                    <div className="flex-1">
                        <img className="w-56" src="/img/scream-logotype.png" alt="" />
                    </div>
                    <div className="hidden sm:block">
                        <Button auto size="large" shadow type="secondary">
                            Connect Wallet
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-12">
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold">Welcome to the SCREAM Bazaar.</h1>
                    <h2 className="text-3xl md:text-4xl">Eiusmod non id aliquip irure veniam aliqua nulla nostrud fugiat in cupidatat nostrud eiusmod.</h2>
                    <div>
                        <Link href="#about">
                            <Button auto size="large" shadow type="secondary">
                                Read More &rarr;
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                    {products.map((product, index) => (
                        <Tilt>
                            <div className="shadow-lg rounded-xl overflow-hidden" onClick={() => setProduct(product.slug)}>
                                <div className="relative h-56 overflow-hidden">
                                    <img className="absolute object-fill" src={product.image} alt="" />
                                </div>
                                <div className="p-6 space-y-1">
                                    <p className="text-2xl font-extrabold">{product.name}</p>
                                    <p className="opacity-50">@{product.creator}</p>
                                </div>
                                <div className="p-6 bg-purple-300 text-white">
                                    <p className="">
                                        <span className="text-lg font-bold align-middle">1000.00 </span>
                                        <span className="align-middle font-medium text-xs">$FTM</span>
                                    </p>
                                </div>
                            </div>
                        </Tilt>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-12" />

            <div id="about" className="bg-black text-gray-600 border-8 border-rainbow">
                <div className="max-w-7xl mx-auto p-12 py-24 md:py-48 space-y-12 md:space-y-24">
                    <div className="space-y-6 max-w-3xl">
                        <p className="text-rainbow text-5xl font-extrabold">Tell me more.</p>
                        <p className="text-2xl">Like any successful project, SCREAM needs funding.</p>
                        <p className="text-2xl">
                            Culpa fugiat in tempor enim veniam dolore irure. Laboris reprehenderit eu incididunt minim est magna duis esse proident eiusmod adipisicing ad cupidatat laboris. Fugiat elit ad aliquip nisi
                            cillum do. Ad consectetur voluptate consequat enim tempor non sit consectetur. Consequat enim minim veniam sint pariatur labore.
                        </p>
                        <p className="text-2xl">
                            Nulla consequat mollit veniam labore. Proident elit aute cillum ad nostrud. Nulla id pariatur dolore nostrud eiusmod sint fugiat. Ea est consequat nulla deserunt duis sunt et.
                        </p>
                    </div>
                    <div className="space-y-2 grid grid-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">One. </span>
                            <span className="align-middle text-3xl">You support an awesome project and amazing artists.</span>
                        </p>
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">Two. </span>
                            <span className="align-middle text-3xl">All NFT holders qualify for the initial SCREAM airdrop.</span>
                        </p>
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">Three. </span>
                            <span className="align-middle text-3xl">All NFT holders get an exclusive role in our Discord server.</span>
                        </p>
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">Four. </span>
                            <span className="align-middle text-3xl">All NFT holders gain access to priorty news and announcements.</span>
                        </p>
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">Five. </span>
                            <span className="align-middle text-3xl">All NFT holders qualify for the initial SCREAM airdrop.</span>
                        </p>
                        <p>
                            <span className="text-rainbow text-4xl align-middle font-extrabold">Six. </span>
                            <span className="align-middle text-3xl">All NFT holders qualify for the initial SCREAM airdrop.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-12 flex items-center">
                <div className="space-x-2 text-3xl">
                    <a href={process.env.NEXT_PUBLIC_TWITTER_URL} target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter" />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL} target="_blank" rel="noreferrer">
                        <i className="fab fa-telegram" />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank" rel="noreferrer">
                        <i className="fab fa-discord" />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer">
                        <i className="fab fa-github" />
                    </a>
                    <a href={process.env.NEXT_PUBLIC_MEDIUM_URL} target="_blank" rel="noreferrer">
                        <i className="fab fa-medium" />
                    </a>
                </div>

                <div className="flex-1" />

                <div>
                    <img className="w-56" src="/img/scream-logotype.png" alt="" />
                </div>
            </div>
        </>
    )
}
