import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import * as constants from '../constants';

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_NETWORK_URL)

const TOKEN_ABI = {
  wftm: constants.CONTRACT_WFTM_TOKEN_ABI,
  usdc: constants.CONTRACT_USDC_TOKEN_ABI,
  dai: constants.CONTRACT_DAI_TOKEN_ABI,
  scream: constants.CONTRACT_SCREAM_TOKEN_ABI,
};

export const getContract = (address: string, abi: any, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getTokenContract = (name, provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    constants.CONTRACT_TOKEN_ADDRESS[name || 'usdc']
      ? constants.CONTRACT_TOKEN_ADDRESS[name || 'usdc'].address
      : constants.CONTRACT_TOKEN_ADDRESS.usdc.address,
    JSON.parse(TOKEN_ABI[name]),  
    provider
  );
};

export const getSctokenContract = (name, provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    constants.CONTRACT_SCTOKEN_ADDRESS[name || 'scusdc']
      ? constants.CONTRACT_SCTOKEN_ADDRESS[name || 'scusdc'].address
      : constants.CONTRACT_SCTOKEN_ADDRESS.scusdc.address,
    JSON.parse(
        constants.CONTRACT_SCTOKEN_ABI
    ),
    provider
  );
};

export const getUnitrollerContract = (provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    constants.CONTRACT_UNITROLLER_ADDRESS,
    JSON.parse(constants.CONTRACT_UNITROLLER_ABI),
    provider
  );
};

export const getPriceOracleContract = (address, provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    address || constants.CONTRACT_PRICE_ORACLE_ADDRESS,
    JSON.parse(constants.CONTRACT_PRICE_ORACLE_ABI),
    provider
  );
};

export const getInterestModelContract = (address, provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    address,
    JSON.parse(constants.CONTRACT_INTEREST_MODEL_ABI),
    provider
  );
};

export const getMulticallContract = (provider?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(
    constants.CONTRACT_MULTICALL_ADDRESS,
    JSON.parse(constants.CONTRACT_MULTICALL_ABI),
    provider
  );
}

export const fetchBalances = async (account: string, tokenId: string, provider?: ethers.Signer | ethers.providers.Provider) => {
  const token = constants.CONTRACT_TOKEN_ADDRESS?.[tokenId?.toLowerCase()];
  const scToken = constants.CONTRACT_SCTOKEN_ADDRESS?.[`sc${tokenId?.toLowerCase()}`];
  if(token && scToken) {
    const tokenContract = getTokenContract(token.id, provider);
    const scTokenContract = getSctokenContract(`sc${token.id}`, provider); 
    const appContract = getUnitrollerContract(provider);
    const tokenDecimal = +token.decimals;
    
    const [wallet, allow, snapshot, balance] = await Promise.all([
      tokenContract.balanceOf(account),
      tokenContract.allowance(account, scToken.address),
      scTokenContract.getAccountSnapshot(account),
      scTokenContract.balanceOf(account),
    ]);

    const hypotheticalLiquidity = await appContract.getHypotheticalAccountLiquidity(account, scToken.address, balance, 0);
    
    return {
      walletBalance: new BigNumber(wallet.toString()).div(
        new BigNumber(10).pow(token.decimals)
      ),
      allowBalance: new BigNumber(allow.toString()).div(new BigNumber(10).pow(scToken.decimals)),
      scTokenBalance: new BigNumber(balance.toString()).div(new BigNumber(10).pow(tokenDecimal)),
      supplyBalance: new BigNumber(snapshot[1].toString()).times(new BigNumber(snapshot[3].toString())).div(new BigNumber(10).pow(18 + tokenDecimal)),
      borrowBalance: new BigNumber(snapshot[2].toString()).div(new BigNumber(10).pow(tokenDecimal)),
      hypotheticalLiquidity: hypotheticalLiquidity
    }
  } else {
    return {
      walletBalance: new BigNumber(0),
      allowBalance: new BigNumber(0),
      scTokenBalance: new BigNumber(0),
      supplyBalance: new BigNumber(0),
      borrowBalance: new BigNumber(0),
      hypotheticalLiquidity: new BigNumber(0)
    }
  }
}