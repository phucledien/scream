import { createContext, useState } from 'react'
import AssetTable from '../components/AssetTable'
import BorrowTool from '../components/BorrowTool'
import Footer from '../components/Footer'
import LendTool from '../components/LendTool'
import TokenPercentageBar from '../components/TokenPercentageBar'
import LiqudityTable from '../components/LiqudityTable'
import Stats from '../components/Stats'
import Header from '../components/Header'
import useMarkets from '../hooks/useMarkets'
import AssetSidebar from '../components/AssetSidebar'
import LoaderModal from '../components/LoaderModal'

export const LendingContext = createContext({})

export default function App() {
    const [showSidebar, setShowSidebar] = useState(false)
    const [refreshMarket, setRefreshMarket] = useState(0)

    const markets = useMarkets(refreshMarket)

    const update = () => {
        setRefreshMarket((prev) => prev + 1)
    }

    return (
        <>
            <LoaderModal tx="0xbd7af71cfd7e663f6a306845a72fc05baff982f4cee10c6589a4829524ecb231" complete={false} />

            <LendingContext.Provider value={{ showSidebar, setShowSidebar }}>
                <AssetSidebar open={showSidebar} hide={() => setShowSidebar(false)} />
                <Header />
                <Stats markets={markets} />
                <div className="max-w-5xl mx-auto p-6 pb-12 md:p-12 md:pb-24">
                    <div className="space-y-6 md:space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
                            <BorrowTool markets={markets} update={update} />
                            <LendTool markets={markets} update={update} />
                        </div>
                        {/* <RepayTool /> */}
                        <AssetTable markets={markets} update={update} />
                    </div>
                </div>
                <Footer />
            </LendingContext.Provider>
        </>
    )
}
