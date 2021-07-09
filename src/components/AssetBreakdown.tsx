import { Modal } from '@geist-ui/react'
import { currencyFormatter } from '../utils'

export default function AssetBreakdown({ open, asset, hide, token }) {
    return (
        <Modal open={open} onClose={hide} width="400px">
            <Modal.Content>
                <div className="space-y-8">
                    <div className="flex items-center space-x-2">
                        <img className="h-12" src={`/img/tokens/${token?.asset}`} alt="" />
                        <div className="text-4xl font-extrabold">{token?.id?.toUpperCase()}</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-blue-400 font-medium">Available Liquidity</p>
                            <p className="text-xl">${`${currencyFormatter(asset?.liquidityUsd)}`}</p>
                        </div>
                        <div>
                            <p className="text-blue-400 font-medium">Utilization Rate</p>
                            <p className="text-xl">{`${asset?.utilizationRate}`}%</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium text-xs">Market Details</p>

                        <div className="flex items-center">
                            <p className="flex-1">Price</p>
                            <p>${currencyFormatter(asset?.underlyingPriceUSD)}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Market Liquidity</p>
                            <p>{`${currencyFormatter(asset?.liquidity)} ${asset?.underlyingSymbol}`}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">{token?.id?.toUpperCase()} Supply Cap</p>
                            <p>No Limited</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">{token?.id?.toUpperCase()} Borrow Cap</p>
                            <p>No Limited</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Reserves</p>
                            <p>{`${currencyFormatter(asset?.reserves)} ${asset?.underlyingSymbol}`}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Reserve Factor</p>
                            <p>{`${currencyFormatter(asset?.reserveFactor * 100)} %`}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Collateral Factor</p>
                            <p>{`${currencyFormatter(asset?.collateralFactor * 100)} %`}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Utilization Rate</p>
                            <p>{`${currencyFormatter(asset?.utilizationRate)} %`}</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Exchange Rate</p>
                            <p>{asset?.exchangeRate}</p>
                        </div>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    )
}
