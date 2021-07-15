import { Button, Select, Input, useToasts } from '@geist-ui/react'
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { CONTRACT_TOKEN_ADDRESS } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import useAlerts from '../../hooks/useAlerts';
import useTotalBorrowLimit from '../../hooks/useTotalBorrowLimit';
import { formatter } from '../../utils';
import { getSctokenContract } from '../../utils/ContractService';
import ConnectWalletButton from '../WalletConnect/ConnectWalletButton';

export default function BorrowTab({markets, update}) {
    const [asset, setAsset] = useState(null);
    const [amount, setAmount] = useState('')
    const [borrowLimit, setBorrowLimit] = useState(new BigNumber(0))
    const [borrowPercent, setBorrowPercent] = useState(new BigNumber(0))
    const [newBorrowPercent, setNewBorrowPercent] = useState(new BigNumber(0))
    const [isLoading, setIsLoading] = useState(false);

    const { totalBorrowLimit, totalBorrowBalance } = useTotalBorrowLimit()
    
    const { account, library } = useActiveWeb3React();
    const [, setToast] = useToasts()
    const { triggerTransactionAlert, deleteTransactionAlert } = useAlerts()
    
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

            const amountBig = new BigNumber(parseFloat(amount) || 0)
            if(totalBorrowLimit.isZero()) {
                setBorrowLimit(new BigNumber(0))
                setNewBorrowPercent(new BigNumber(0))
            } else {
                setBorrowPercent(totalBorrowBalance.div(totalBorrowLimit).times(100))
                setNewBorrowPercent((totalBorrowBalance.plus(amountBig.times(asset.underlyingPriceUSD))).div(totalBorrowLimit).times(100))
            }   
        }
    }, [asset, account, amount, totalBorrowLimit])

    const calculateBorrowLimit = async() => {
        let limit = new BigNumber(0);
        if(!account || !asset || !library) {
            setBorrowLimit(limit)
            return;
        }
        
        limit = totalBorrowLimit.minus(totalBorrowBalance);
        setBorrowLimit(limit.div(asset?.underlyingPriceUSD));
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
                triggerTransactionAlert(tx?.hash)
                await tx.wait(1)
                deleteTransactionAlert(tx?.hash)
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
                    <Button loading={isLoading} className="flex-1" type="secondary" onClick={borrow}>{ isLoading ? 'Loading...' : 'Borrow' }</Button>
                )}
            </div>

            <div className="rounded-xl bg-black text-white p-4 text-xs">
                <p className="flex">
                    <span className="opacity-50 flex-1">Borrow Limit</span>
                    <span className="">${formatter(totalBorrowLimit, 2) || '-'}</span>
                </p>
                <p className="flex">
                    <span className="opacity-50 flex-1">Borrow Limit Used</span>
                    <span className="">{formatter(borrowPercent, 2, '%')}-&gt;{formatter(newBorrowPercent, 2, '%')}</span>
                </p>
            </div>
        </div>
    )
}
