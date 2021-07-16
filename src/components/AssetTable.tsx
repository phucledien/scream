import { Button, Input, Table, Toggle, useToasts } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import AssetBreakdown from '../components/AssetBreakdown'
import { CONTRACT_SCTOKEN_ADDRESS, CONTRACT_TOKEN_ADDRESS } from '../constants'
import { useActiveWeb3React } from '../hooks'
import { currencyFormatter } from '../utils'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'

export default function AssetTable({ markets, update }) {
    const [search, setSearch] = useState('')
    const [showBreakdown, setShowBreakdown] = useState(null)
    const [filteredMarkets, setFilteredMarkets] = useState([])

    const { account, library } = useActiveWeb3React()
    const [, setToast] = useToasts()

    const getToken = (market) => CONTRACT_TOKEN_ADDRESS[market?.underlyingSymbol?.toLowerCase()]

    useEffect(() => {
        if (markets && markets.length) {
            const temp = markets
                .filter(
                    (market) =>
                        (market.id.toLowerCase().includes(search.toLowerCase()) || market.symbol.toLowerCase().includes(search.toLowerCase()) || market.underlyingSymbol.toLowerCase().includes(search.toLowerCase())) &&
                        Object.keys(CONTRACT_SCTOKEN_ADDRESS).find((token) => token === market.symbol.toLowerCase())
                )
                .map((market) => ({
                    ...market,
                    name: (
                        <div className="flex items-center space-x-2">
                            <div className="w-5">
                                <img className="h-4" src={`/img/tokens/${getToken(market)?.asset}`} alt="" />
                            </div>
                            <a href={`http://ftmscan.com/address/${market.id}`}>
                                {getToken(market)?.id.toUpperCase()} ($
                                {getToken(market)?.symbol})
                            </a>
                        </div>
                    ),
                    supply: `${market.supplyAPY?.toFixed(2)}%`,
                    borrow: `${market.borrowAPY?.toFixed(2)}%`,
                    liquidity: `${currencyFormatter(market.liquidity)}`,
                    wallet: `${currencyFormatter(market?.walletBalance || '0')} ${market.underlyingSymbol}`,
                    collateral: <Toggle initialChecked={market?.collateral} size="large" onChange={(e) => handleCollateral(e, market)} />,
                    action: (
                        <Button onClick={() => setShowBreakdown(market)} auto size="mini">
                            Asset Breakdown
                        </Button>
                    )
                }))

            setFilteredMarkets(temp)
        }
    }, [markets, search])

    const handleCollateral = async (e, market) => {
        if (market && account && market?.borrowBalance.isZero()) {
            const appContract = getUnitrollerContract(library?.getSigner())
            const scTokenContract = getSctokenContract(market.id, library?.getSigner())
            const { collateral } = market
            let tx = null
            try {
                if (!collateral) {
                    tx = await appContract.enterMarkets([market.id])
                } else {
                    const balance = await scTokenContract.balanceOf(account);
                    const hypotheticalLiquidity = await appContract.getHypotheticalAccountLiquidity(account, market.id, balance, 0);

                    if (hypotheticalLiquidity['1'] > 0 || +hypotheticalLiquidity['2'] === 0) {
                        tx = await appContract.exitMarket(market.id)
                    } else {
                        setToast({ text: 'You need to set collateral at least one asset for your borrowed assets. Please repay all borrowed asset or set other asset as collateral.', type: 'error' })
                    }
                } 
               
                if (tx) {
                    await tx.wait(1)
                }
            } catch (e) {
                console.log(e)
            }

            update()
        } else {
            setToast({ text: 'You need to set collateral at least one asset for your borrowed assets. Please repay all borrowed asset or set other asset as collateral.', type: 'error' })
        }
    }

    return (
        <>
            <AssetBreakdown open={!!showBreakdown} asset={showBreakdown} token={getToken(showBreakdown)} hide={() => setShowBreakdown(false)} />
            <div className="bg-white border-gray-100 border rounded-xl shadow-xl p-6 space-y-4">
                <div>
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} size="large" width="100%" placeholder="Search for your favorite tokens..." />
                </div>
                <div className="overflow-auto hide-scroll-bars">
                    <Table data={filteredMarkets} className="whitespace-nowrap">
                        <Table.Column prop="name" label="name" />
                        <Table.Column prop="supply" label="supply apy" />
                        <Table.Column prop="borrow" label="borrow apy" />
                        <Table.Column prop="liquidity" label="liquidity" />
                        <Table.Column prop="wallet" label="Your Wallet" />
                        <Table.Column prop="collateral" label="Collateral" />
                        <Table.Column prop="action" label="Action" />
                    </Table>
                </div>
            </div>
        </>
    )
}
