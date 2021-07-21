import { Button, Input, Table, useToasts } from '@geist-ui/react'
import { useEffect, useState } from 'react'
import Switch from "react-switch";
import AssetBreakdown from '../components/AssetBreakdown'
import { CONTRACT_SCTOKEN_ADDRESS, CONTRACT_TOKEN_ADDRESS } from '../constants'
import { useActiveWeb3React } from '../hooks'
import { currencyFormatter, formatter } from '../utils'
import { getSctokenContract, getUnitrollerContract } from '../utils/ContractService'

export default function AssetTable({ markets, update }) {
    const [search, setSearch] = useState('')
    const [showBreakdown, setShowBreakdown] = useState(null)
    const [filteredMarkets, setFilteredMarkets] = useState([])
    const [collateralEnabled, setCollateralEnabled] = useState(new Map())

    const { account, library } = useActiveWeb3React()
    const [, setToast] = useToasts()

    const getToken = (market) => CONTRACT_TOKEN_ADDRESS[market?.underlyingSymbol?.toLowerCase()]

    useEffect(() => {
        if(markets && markets.length) {
            const tempCollateralEnabled = new Map()
            markets.forEach(market => {
                tempCollateralEnabled.set(market.id, market.collateral)
            });
            setCollateralEnabled(tempCollateralEnabled)
        }
    }, [markets])

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
                            <a href={`http://ftmscan.com/address/${market.id}`}>{getToken(market)?.id.toUpperCase()}</a>
                        </div>
                    ),
                    supply: `${market.supplyAPY?.toFixed(2)}%`,
                    borrow: `${market.borrowAPY?.toFixed(2)}%`,
                    liquidity: `${currencyFormatter(market.liquidity)}`,
                    price: `$${formatter(+market.underlyingPriceUSD, 2)}`,
                    wallet: `${currencyFormatter(market?.walletBalance || '0')} ${market.underlyingSymbol}`,
                    collateral: <Switch  
                        checked={collateralEnabled.get(market.id) || false}
                        onChange={(e) => handleCollateral(market)} 
                        disabled={+market?.collateralFactor == 0}
                        height={20}
                        width={40}
                        className="react-switch"
                        />,
                    action: (
                        <Button onClick={() => setShowBreakdown(market)} auto size="mini">
                            Asset Breakdown
                        </Button>
                    )
                }))

            setFilteredMarkets(temp)
        }
    }, [markets, search, collateralEnabled])

    const handleCollateral = async (market) => {
        const { collateral } = market
        if (account && market?.borrowBalance.isZero()) {
            const appContract = getUnitrollerContract(library?.getSigner())
            const scTokenContract = getSctokenContract(market.symbol.toLowerCase(), library?.getSigner())
            let tx = null
            let result = collateral;
            try {
                if (!collateral) {
                    tx = await appContract.enterMarkets([market.id])
                    result = true;
                } else {
                    const balance = await scTokenContract.balanceOf(account)
                    const hypotheticalLiquidity = await appContract.getHypotheticalAccountLiquidity(account, market.id, balance, 0)
                    if (hypotheticalLiquidity['1'].toNumber() > 0 || hypotheticalLiquidity['2'].isZero()) {
                        tx = await appContract.exitMarket(market.id)
                        result = false;
                    } else {
                        setToast({ text: 'You need to set collateral at least one asset for your borrowed assets. Please repay all borrowed asset or set other asset as collateral.', type: 'error' })
                    }
                }

                if (tx) {
                    await tx.wait(1)
                    const temp = collateralEnabled
                    temp.set(market.id, result)
                    setCollateralEnabled(temp)
                }
            } catch (e) {
                console.log(e)
                result = collateral;
            }
            update()
        } else {
            setToast({ text: 'Please repay all borrowed asset or set other asset as collateral.', type: 'error' })
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
                        <Table.Column prop="price" label="Price" />
                        <Table.Column prop="wallet" label="Your Wallet" />
                        <Table.Column prop="collateral" label="Collateral" />
                        <Table.Column prop="action" label="Action" />
                    </Table>
                </div>
            </div>
        </>
    )
}
