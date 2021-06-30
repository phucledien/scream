import { Button, Input, Table } from '@geist-ui/react'
import { useState } from 'react'
import AssetBreakdown from '../components/AssetBreakdown'
import Tokens from '../data/tokens'

export default function AssetTable() {
    const [search, setSearch] = useState('')

    const [showBreakdown, setShowBreakdown] = useState('')

    const tokens = Tokens.filter((token) => token.name.toLowerCase().includes(search.toLowerCase()) || token.ticker.toLowerCase().includes(search.toLowerCase())).map((token) => ({
        ...token,
        name: (
            <div className="flex items-center space-x-2">
                <div className="w-5">
                    <img className="h-4" src={`/img/tokens/${token.icon}`} alt="" />
                </div>
                <a href={`http://ftmscan.com/address/${token.contract}`}>
                    {token.name} ($
                    {token.ticker})
                </a>
            </div>
        ),
        action: (
            <Button onClick={() => setShowBreakdown(token)} auto size="mini">
                Asset Breakdown
            </Button>
        )
    }))

    return (
        <>
            <AssetBreakdown open={!!showBreakdown} asset={showBreakdown} hide={() => setShowBreakdown(false)} />
            <div className="bg-white border-gray-100 border rounded-xl shadow-xl p-6 space-y-4">
                <div>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} size="large" width="100%" placeholder="Search for your favorite tokens..." />
                </div>
                <div className="overflow-auto hide-scroll-bars">
                    <Table data={tokens} className="whitespace-nowrap">
                        <Table.Column prop="name" label="name" />
                        <Table.Column prop="supply" label="supply apy" />
                        <Table.Column prop="borrow" label="borrow apy" />
                        <Table.Column prop="liquidity" label="liquidity" />
                        <Table.Column prop="wallet" label="Your Wallet" />
                        <Table.Column prop="action" label="Action" />
                    </Table>
                </div>
            </div>
        </>
    )
}
