import { useEffect, useState } from 'react'
import { Link } from '@geist-ui/react'
import axios from 'axios'
import useRefresh from './useRefresh'
import { GRAPHQL_URL } from '../constants';
import { useActiveWeb3React } from '.';
import useMarkets from './useMarkets';
import { formatter, getFtmScanLink } from '../utils';

export default function useTxHistory() {
    const { slowRefresh } = useRefresh()
    const { markets } = useMarkets();
    const { account, library } = useActiveWeb3React();

    const [transactions, setTransactions] = useState([])

    const blockTimeToDate = (blockTime) => {
        return new Date(blockTime * 1000).toLocaleString()
    }

    const explorer = (txHash) => {
        return <Link href={getFtmScanLink(txHash, 'transaction')} icon color target='_blank'>Explorer</Link>
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            console.log(' ================== > refreshing transaction history')
            const transactionData = await axios.post(
                GRAPHQL_URL,
                {
                  query: `{
                    mintEvents(first: 100, where: {to: "${account}"}, orderBy: blockTime, orderDirection: desc) {
                        id
                        to
                        blockTime
                        cTokenSymbol
                        underlyingAmount
                    }
                    redeemEvents(first: 100, where: {from: "${account}"}, orderBy: blockTime, orderDirection: desc) {
                        id
                        blockTime
                        from
                        cTokenSymbol
                        underlyingAmount
                    }
                    borrowEvents(first: 100, where: {borrower: "${account}"}, orderBy: blockTime, orderDirection: desc) {
                        id
                        blockTime
                        borrower
                        underlyingSymbol
                        amount
                    }
                    repayEvents(first: 100, where: {borrower: "${account}"}, orderBy: blockTime, orderDirection: desc) {
                        id
                        blockTime
                        borrower
                        underlyingSymbol
                        amount
                    }
                  }`,
                },
            )
            let borrowEvents = transactionData?.data?.data?.borrowEvents;
            let repayEvents = transactionData?.data?.data?.repayEvents;
            let supplyEvents = transactionData?.data?.data?.mintEvents;
            let withdrawEvents = transactionData?.data?.data?.redeemEvents;
           
            borrowEvents = (borrowEvents || []).map(event => ({
                type: 'borrow',
                blockTime: event.blockTime,
                txHash: explorer(event.id.split('-')[0]),
                date: blockTimeToDate(event?.blockTime),
                detail: `You borrowed ${formatter(event.amount, 2, event.underlyingSymbol)}.`,
            }))
            repayEvents = (repayEvents || []).map(event => {
                return {
                    type: 'repay',
                    blockTime: event.blockTime,
                    txHash: explorer(event.id.split('-')[0]),
                    date: blockTimeToDate(event?.blockTime),
                    detail: `You repaid ${formatter(event.amount, 2, event.underlyingSymbol)}.`
                }
            })
            supplyEvents = (supplyEvents || []).map(event => {
                return {
                    type: 'supply',
                    blockTime: event.blockTime,
                    txHash: explorer(event.id.split('-')[0]),
                    date: blockTimeToDate(event?.blockTime),
                    detail: `You lent ${formatter(event.underlyingAmount, 2, event.cTokenSymbol.slice(2))}.`
                }
            })
            withdrawEvents = (withdrawEvents || []).map(event => {
                return {
                    type: 'withdraw',
                    blockTime: event.blockTime,
                    txHash: explorer(event.id.split('-')[0]),
                    date: blockTimeToDate(event?.blockTime),
                    detail: `You withdraw ${formatter(event.underlyingAmount, 2, event.cTokenSymbol.slice(2))}.`
                }
            })
            
            const allEvents = (borrowEvents
                .concat(repayEvents)
                .concat(supplyEvents)
                .concat(withdrawEvents)).sort((a, b) => (b.blockTime - a.blockTime));
            
            setTransactions(allEvents)    
        }
        
        fetchTransactions()

    }, [account, slowRefresh, markets])

    return transactions;
}
