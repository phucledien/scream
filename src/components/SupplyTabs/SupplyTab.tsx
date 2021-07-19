import { Button, Select, Input, useToasts, Slider } from '@geist-ui/react'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { CONTRACT_TOKEN_ADDRESS } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import useAlerts from '../../hooks/useAlerts'
import { formatter } from '../../utils'
import { getSctokenContract, getTokenContract } from '../../utils/ContractService'
import ConnectWalletButton from '../WalletConnect/ConnectWalletButton'

export default function SupplyTab({ markets, update }) {
    const [asset, setAsset] = useState(null)
    const [amount, setAmount] = useState('')
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showSlider, setShowSlider] = useState(false)

    const { account, library } = useActiveWeb3React()
    const [, setToast] = useToasts()
    const { triggerTransactionAlert, deleteTransactionAlert } = useAlerts()

    useEffect(() => {
        if (markets?.length) {
            if (!asset) {
                setAsset(markets[0])
            } else {
                setAsset((markets || []).find((item) => item.id == asset.id))
            }
        }
    }, [markets])

    useEffect(() => {
        setIsEnabled(asset?.allowBalance?.gt(0))
    }, [asset])

    const onChangeAsset = async (value) => {
        setAsset((markets || []).find((item) => item.id == value))
    }

    const onChangeAmount = async (e) => {
        setAmount(e.target.value)
    }

    const approve = async () => {
        setIsLoading(true)
        try {
            const tokenContract = getTokenContract(asset?.underlyingSymbol?.toLowerCase(), library?.getSigner())
            if (tokenContract) {
                const tx = await tokenContract.approve(asset?.id, new BigNumber(2).pow(256).minus(1).toString(10))
                triggerTransactionAlert(tx?.hash)
                await tx.wait(2)
                deleteTransactionAlert(tx.hash)
                setIsEnabled(true)
                update()
            }
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const supply = async () => {
        const id = asset?.symbol?.toLowerCase()
        if (!id) {
            setToast({ text: 'Invalid Asset', type: 'error' })
            return
        }
        const scTokenContract = getSctokenContract(id, library.getSigner())
        const token = CONTRACT_TOKEN_ADDRESS?.[asset.underlyingSymbol.toLowerCase()]

        if (+amount <= 0 || +amount > asset.walletBalance.toNumber()) {
            setToast({ text: `Invalid Amount. Your Supply Limit is ${asset.walletBalance.dp(8, 1).toString()} ${token.symbol.toUpperCase()}`, type: 'error' })
            return
        }

        if (token && account) {
            setIsLoading(true)

            try {
                const tx = await scTokenContract.mint(new BigNumber(amount).times(new BigNumber(10).pow(token?.decimals)).toString(10))
                triggerTransactionAlert(tx?.hash)
                await tx.wait(1)
                deleteTransactionAlert(tx.hash)
                update()
            } catch (e) {
                console.log(e)
            }

            setAmount('')
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center">
                <p className="text-xl font-bold flex-1">Lend Assets</p>

                <Select placeholder="Assets" value={asset?.id} onChange={onChangeAsset}>
                    {markets &&
                        markets.map((market) => (
                            <Select.Option value={market.id} key={market.id}>
                                <div className="flex items-center space-x-2">
                                    <img className="block w-4 h-4" src={`/img/tokens/${market.icon}`} alt="" />
                                    <p>{market.underlyingSymbol}</p>
                                </div>
                            </Select.Option>
                        ))}
                </Select>
            </div>

            <div className="flex space-x-2">
                <Button auto>Max</Button>
                <div className="flex-1">
                    <Input label="Amount" type="number" size="large" width="100%" placeholder="Enter an amount" value={amount} onChange={onChangeAmount} />
                </div>
                <Button onClick={() => setShowSlider((_) => !_)} auto>
                    <i className={`fas fa-chevron-circle-${showSlider ? 'up' : 'down'}`} />
                </Button>
            </div>

            {showSlider && (
                <div>
                    <Slider step={0.2} max={1} min={0.2} initialValue={0.4} />
                </div>
            )}

            <div className="flex">
                {!account && <ConnectWalletButton className="flex-1" type="secondary" />}
                {account && asset && isEnabled && (
                    <Button loading={isLoading} className="flex-1" type="secondary" onClick={supply}>
                        {isLoading ? 'Loading...' : 'Supply'}
                    </Button>
                )}
                {account && asset && !isEnabled && (
                    <Button loading={isLoading} className="flex-1" type="secondary" onClick={approve}>
                        {isLoading ? 'Loading...' : 'Approve'}
                    </Button>
                )}
            </div>

            <div className="rounded-xl bg-black text-white p-4 text-xs">
                <p className="flex">
                    <span className="opacity-50 flex-1">Balance</span>
                    <span className="">{formatter(asset?.walletBalance, 6, asset?.underlyingSymbol?.toUpperCase()) || '-'}</span>
                </p>
                <p className="flex">
                    <span className="opacity-50 flex-1">Deposit APY</span>
                    <span className="">{formatter(asset?.supplyAPY, 2, '%') || '-'}</span>
                </p>
            </div>
        </div>
    )
}
