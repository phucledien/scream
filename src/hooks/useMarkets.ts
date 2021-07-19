import { useEffect, useState } from 'react'
import axios from 'axios'
import useRefresh from './useRefresh'
import { CONTRACT_SCTOKEN_ADDRESS, CONTRACT_TOKEN_ADDRESS,CONTRACT_SCTOKEN_ABI, GRAPHQL_URL } from '../constants';
import { fetchBalances, getSctokenContract, getUnitrollerContract } from '../utils/ContractService';
import BigNumber from 'bignumber.js';
import { useActiveWeb3React } from '.';
import multicall from '../utils/multicall';

export default function useMarkets(refresh = 0) {
    const { slowRefresh } = useRefresh()
    const [ markets, setMarkets ] = useState([])
    const [ refreshing, setRefreshing ] = useState(false)
    const { account, library } = useActiveWeb3React()

    useEffect(() => {
        const fetchMarkets = async () => {
            console.log(' ================== > refreshing markets')
            setRefreshing(true)
            const marketData = await axios.post(
                GRAPHQL_URL,
                {
                  query: `{
                    markets(first: 100) {
                      borrowRate
                      cash
                      collateralFactor
                      exchangeRate
                      interestRateModelAddress
                      name
                      reserves
                      supplyRate
                      symbol
                      id
                      totalBorrows
                      totalSupply
                      underlyingAddress
                      underlyingName
                      underlyingPrice
                      underlyingSymbol
                      underlyingPriceUSD
                      accrualBlockNumber
                      blockTimestamp
                      borrowIndex
                      reserveFactor
                      underlyingDecimals
                    }
                  }`,
                },
            )
            const allMarkets = marketData?.data?.data?.markets;
           
            const appContract = getUnitrollerContract(library);
            if(allMarkets) {
                const allMarketSymbols = Object.values(CONTRACT_SCTOKEN_ADDRESS).map(item => item.symbol.toLowerCase())
                const filteredMarkets = allMarkets.filter((market) => (allMarketSymbols.find(token => token === market.symbol.toLowerCase())))
                const assetsIn = account ? await appContract.getAssetsIn(account) : [];
                
                //
                const scTokenABI = JSON.parse(CONTRACT_SCTOKEN_ABI);
                const supplyRatePerBlockCalls = filteredMarkets.map((market) => {
                    return {
                        address: market.id,
                        name: 'supplyRatePerBlock',
                    }
                })
                const borrowRatePerBlockCalls = filteredMarkets.map((market) => {
                    return {
                        address: market.id,
                        name: 'borrowRatePerBlock',
                    }
                })
                const getCashCalls = filteredMarkets.map((market) => {
                    return {
                        address: market.id,
                        name: 'getCash',
                    }
                })
                const [supplyRatePerBlocks, borrowRatePerBlocks, getCashs] = await Promise.all([
                    multicall(scTokenABI, supplyRatePerBlockCalls),
                    multicall(scTokenABI, borrowRatePerBlockCalls),
                    multicall(scTokenABI, getCashCalls)
                ])
                
                let promises = [];
                for(let i = 0; i < filteredMarkets.length; i++) {
                    promises.push(calculateAPY(filteredMarkets[i], supplyRatePerBlocks[i], borrowRatePerBlocks[i], getCashs[i], assetsIn, account, library))
                }
                let calculatedMarkets = await Promise.all(promises);

                console.log("refreshing markets result ===== ")
                setMarkets(calculatedMarkets)
            }

            setRefreshing(false)
        }
        
        fetchMarkets()

    }, [account, slowRefresh, refresh])

    return {
        markets,
        refreshing
    };
}


const calculateAPY = async(market, supplyRate, borrowRate, getCash, assetsIn, account, provider) => {
    if(!market) {
        return false;
    }
    
    const scToken = CONTRACT_SCTOKEN_ADDRESS?.[market?.symbol?.toLowerCase()];
    const token = CONTRACT_TOKEN_ADDRESS?.[market?.underlyingSymbol?.toLowerCase()];
    const scTokenContract = getSctokenContract(market?.symbol?.toLowerCase(), provider);
     
    const borrows = new BigNumber(market?.totalBorrows);
    const reserves = new BigNumber(market.reserves || 0);
    const reserveFactor = new BigNumber(market.reserveFactor).div(new BigNumber(10).pow(18))
    const underlyingPriceUSD = new BigNumber(market.underlyingPriceUSD);
    const total_borrows_usd = borrows.times(underlyingPriceUSD).dp(2,1).toNumber();
    const total_supply_usd = new BigNumber(market.totalSupply).times(market.exchangeRate).times(underlyingPriceUSD).dp(2,1).toNumber();

    const collateral = assetsIn.map(item => item.toLowerCase()).includes(scToken.address.toLowerCase());

    try {
        let balances = {}
        if(account && provider) {
            balances = await fetchBalances(account, token, scToken, provider)
        }

        let supplyRatePerBlock = new BigNumber(supplyRate.toString());
        let borrowRatePerBlock = new BigNumber(borrowRate.toString());
        let cash = new BigNumber(getCash.toString()).div(new BigNumber(10).pow(token?.decimals));
        const currentUtilizationRate = borrows.eq(0) ? new BigNumber(0) : borrows.div(
            cash.plus(borrows).minus(reserves)
        );
        
        // APY = ((((Rate / ETH Mantissa * Blocks Per Day + 1) ^ Days Per Year)) - 1) * 100
        const ethMantissa = new BigNumber(10).pow(18);
        const blocksPerDay = 86400; // 1 seconds per block
        const daysPerYear = 365;

        const supplyAPY = ((((supplyRatePerBlock.div(ethMantissa).times(blocksPerDay)).plus(1)).pow(daysPerYear))).minus(1);
        const borrowAPY = ((((borrowRatePerBlock.div(ethMantissa).times(blocksPerDay)).plus(1)).pow(daysPerYear))).minus(1);

        return {
            ...market,
            reserveFactor: reserveFactor.toNumber(),
            liquidity: cash.toNumber(),
            borrowAPY: borrowAPY.times(100).dp(2,1).toNumber(),
            supplyAPY: supplyAPY.times(100).dp(2,1).toNumber(),
            utilizationRate: currentUtilizationRate.times(100).dp(2,1).toNumber(),
            totalBorrowsUsd: total_borrows_usd,
            totalSupplyUsd: total_supply_usd,
            liquidityUsd: cash.times(underlyingPriceUSD).dp(2,1).toNumber(),
            ...balances,
            collateral: collateral,
            icon: token.asset
        }
    }catch(e) {
        console.log(e)
        return {
            ...market,
            reserveFactor: reserveFactor.toNumber(),
            liquidity: 0,
            borrowAPY: 0,
            supplyAPY: 0,
            utilizationRate: 0,
            totalBorrowsUsd: total_borrows_usd,
            totalSupplyUsd: total_supply_usd,
            liquidityUsd: 0,
            collateral: collateral,
            borrowBalance: new BigNumber(0),
            supplyBalance: new BigNumber(0),
            icon: token.asset
        }
    }
}