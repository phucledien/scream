import { Button, Select, Input, useToasts } from '@geist-ui/react'
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { CONTRACT_TOKEN_ADDRESS } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import { currencyFormatter, formatter } from '../../utils';
import { getSctokenContract, getTokenContract, getUnitrollerContract } from '../../utils/ContractService';
import ConnectWalletButton from '../WalletConnect/ConnectWalletButton';

export default function BorrowTab({markets, update}) {
    const [asset, setAsset] = useState(null);
    const [amount, setAmount] = useState('')
    const [borrowLimit, setBorrowLimit] = useState(new BigNumber(0))
    const [isLoading, setIsLoading] = useState(false);

    const { account, library } = useActiveWeb3React();
    const [, setToast] = useToasts()
    
    useEffect(() => {
        if(markets?.length) {
            if(!asset) {
                setAsset(markets[0])
            } else {
                setAsset((markets || []).find(item => item.id == asset.id))
            }
        }
    }, [markets])

    useEffect(() => {
        if(asset && account) {
            calculateBorrowLimit()
        }
    }, [asset, account])

    const calculateBorrowLimit = async() => {
        let limit = new BigNumber(0);
        if(!account || !asset || !library) {
            setBorrowLimit(limit)
            return;
        }
        const appContract = getUnitrollerContract(library);

        if(appContract) {
            const accountLiquidity = await appContract.getAccountLiquidity(account);
            // error = 0
            if(+accountLiquidity['0'] == 0) {
                let liquidity = new BigNumber(accountLiquidity['1'].toString()).div(new BigNumber(10).pow(18));
                limit = +asset.underlyingPriceUSD == 0 ? new BigNumber(0) : liquidity.div(asset.underlyingPriceUSD);
            }
        }
        
        setBorrowLimit(limit);
    }

    const onChangeAsset = async (value) => {
        setAsset((markets || []).find(item => item.id == value))
    }
    
    const onChangeAmount = async (e) => {
        setAmount(e.target.value)
    }

    const borrow = async() => {
        const id = asset?.symbol?.toLowerCase();
        if(!id) {
            setToast({ text: 'Invalid Asset', type: 'error' })
            return;
        }

        const scTokenContract = getSctokenContract(id, library.getSigner());
        const token = CONTRACT_TOKEN_ADDRESS?.[asset.underlyingSymbol.toLowerCase()];
        
        let borrowAmount = new BigNumber(parseFloat(amount) || 0).times(new BigNumber(10).pow(token?.decimals))
        if(borrowAmount.lte(0) || new BigNumber(amount).gt(borrowLimit)) {
            setToast({ text: `Invalid Amount! Your borrow Limit is ${borrowLimit.dp(8,1).toString(10)} ${token.symbol.toUpperCase()}`, type: 'error' })
            return;
        }

        if (token && account) {
            setIsLoading(true);
            
            try {
                const tx = await scTokenContract.borrow(borrowAmount.toString(10))
                await tx.wait(1)
                update()
            } catch(e) {
                console.log(e)
            }

            setAmount('')
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center">
                <p className="text-xl font-bold flex-1">Borrow Assets</p>

                <Select placeholder="Assets" value={asset?.id} onChange={onChangeAsset}>
                    {markets && markets.map(market => (
                        <Select.Option value={market.id} key={market.id}>{market.underlyingSymbol}</Select.Option>
                    ))}
                </Select>
            </div>

            <div>
                <Input label="Amount" type="number" size="large" width="100%" placeholder="Enter an amount" value={amount} onChange={onChangeAmount}/>
            </div>

            <div className="flex">
                {!account && (
                    <ConnectWalletButton className="flex-1" type="secondary"/>
                )}
                {account && asset && (
                    <Button className="flex-1" type="secondary" onClick={borrow}>{ isLoading ? 'Loading...' : 'Borrow' }</Button>
                )}
            </div>

            <div className="rounded-xl bg-black text-white p-4 text-xs">
                <p className="flex">
                    <span className="opacity-50 flex-1">Borrow APY</span>
                    <span className="">{formatter(asset?.borrowAPY, 2, '%') || '-'}</span>
                </p>
                <p className="flex">
                    <span className="opacity-50 flex-1">Liquidity Available</span>
                    <span className="">{formatter(asset?.liquidity, 6, asset?.underlyingSymbol?.toUpperCase()) || '-'}</span>
                </p>
            </div>
        </div>
    )
}
