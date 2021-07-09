import { Button, Select, Input, useToasts } from '@geist-ui/react'
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { CONTRACT_TOKEN_ADDRESS } from '../../constants';
import { useActiveWeb3React } from '../../hooks'
import { formatter } from '../../utils';
import { getSctokenContract } from '../../utils/ContractService';
import ConnectWalletButton from '../WalletConnect/ConnectWalletButton';

export default function WithdrawTab({markets, update}) {
    const [asset, setAsset] = useState(null);
    const [amount, setAmount] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const { account, library } = useActiveWeb3React();
    const [, setToast] = useToasts()
    
    useEffect(() => {
        if(markets?.length) {
            if(!asset) {
                setAsset(markets[0])
            }
        }
    }, [markets])


    const onChangeAsset = async (value) => {
        setAsset((markets || []).find(item => item.id == value))
    }
    
    const onChangeAmount = async (e) => {
        setAmount(e.target.value)
    }

    const withdraw = async() => {
        const id = asset?.symbol?.toLowerCase();
        if(!id) {
            setToast({ text: 'Invalid Asset', type: 'error' })
            return;
        }

        if(+amount <= 0 || +amount > asset.supplyBalance.toNumber()) {
            setToast({ text: 'Invalid Amount', type: 'error' })
            return;
        }

        const scTokenContract = getSctokenContract(id, library.getSigner());
        const token = CONTRACT_TOKEN_ADDRESS?.[asset.underlyingSymbol.toLowerCase()];
        const withdrawAmount = new BigNumber(amount);
        if (token && account) {
            setIsLoading(true);
            
            try {
                let tx = null;
                if(withdrawAmount.gte(asset.supplyBalance)) {
                    const cTokenBalance = await scTokenContract.balanceOf(account)
                    tx = await scTokenContract.redeem(cTokenBalance);
                }else {
                    tx = await scTokenContract.redeemUnderlying(
                        withdrawAmount
                            .times(new BigNumber(10).pow(token.decimals))
                            .integerValue()
                            .toString(10)
                      );
                }
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
                <p className="text-xl font-bold flex-1">Withdraw Assets</p>

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
                    <Button className="flex-1" type="secondary" onClick={withdraw}>{ isLoading ? 'Loading...' : 'Withdraw' }</Button>
                )}
            </div>

            <div className="rounded-xl bg-black text-white p-4 text-xs">
                <p className="flex">
                    <span className="opacity-50 flex-1">Supply Balance</span>
                    <span className="">{formatter(asset?.supplyBalance, 6, asset?.underlyingSymbol?.toUpperCase()) || '-'}</span>
                </p>
                <p className="flex">
                    <span className="opacity-50 flex-1">Deposit APY</span>
                    <span className="">{formatter(asset?.supplyAPY, 2, '%') || '-'}</span>
                </p>
            </div>
        </div>
    )
}
