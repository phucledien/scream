import Link from 'next/link'

export default function Header() {
    return (
        <div className="relative z-10 bg-pink-500 text-white">
            <div className="max-w-5xl mx-auto p-6 py-4 md:px-12 flex items-center whitespace-nowrap space-x-4">
                <a href="/">
                    <p className="text-xs opacity-75">&larr; Back to Lauchpad</p>
                </a>
                <Link href="/lend">
                    <a>
                        <p className="text-xs opacity-75">Lending</p>
                    </a>
                </Link>
                <Link href="/stake">
                    <a>
                        <p className="text-xs opacity-75">Staking</p>
                    </a>
                </Link>
            </div>
        </div>
    )
}
