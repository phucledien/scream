import AssetTable from '../components/AssetTable'
import BorrowTool from '../components/BorrowTool'
import Footer from '../components/Footer'
import LendTool from '../components/LendTool'
import TokenPercentageBar from '../components/TokenPercentageBar'
import LiqudityTable from '../components/LiqudityTable'
import Stats from '../components/Stats'
import Header from '../components/Header'
import { useState } from 'react'
import useMarkets from '../hooks/useMarkets'

export default function App() {
    const [refreshMarket, setRefreshMarket] = useState(0)

    const markets = useMarkets(refreshMarket);

    const update = () => {
        setRefreshMarket(prev => prev + 1);
    }

    return (
        <>
            <Header />
            <Stats markets={markets}/> 
            <div className="max-w-5xl mx-auto p-6 pb-12 md:p-12 md:pb-24">
                <div className="space-y-6 md:space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
                        <BorrowTool markets={markets} update={update}/>
                        <LendTool markets={markets} update={update}/>
                    </div>
                    {/* <RepayTool /> */}
                    <AssetTable markets={markets} update={update}/>
                </div>
            </div>
            {/* <div className="bg-pink-200">
                <div className="max-w-5xl mx-auto p-6 py-12 md:p-12 md:py-24">
                    <AssetTable />
                    <div className="space-y-4">
                        {coins.map((coin, index) => (
                            <CoinListItem coin={coin} key={coin.ticker} />
                        ))}
                    </div>
                </div>
            </div> */}
            <Footer />
        </>
    )
}
