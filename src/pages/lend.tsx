import { createContext, useState } from 'react'
import { Button } from '@geist-ui/react'
import AssetSidebar from '../components/AssetSidebar'
import AssetTable from '../components/AssetTable'
import BorrowTool from '../components/BorrowTool'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LendTool from '../components/LendTool'
import Stats from '../components/Stats'
import useMarkets from '../hooks/useMarkets'
import StakingSidebar from '../components/StakingSidebar'

export const LendingContext = createContext({})

export default function App() {
    const [showAssetsSidebar, setShowAssetsSidebar] = useState(false)
    const [showStakingSidebar, setShowStakingSidebar] = useState(false)

    const [stakingSidebarSlug, setStakingSidebarSlug] = useState(false)

    const [refreshMarket, setRefreshMarket] = useState(0)

    const { markets } = useMarkets(refreshMarket)

    const update = () => {
        setRefreshMarket((prev) => prev + 1)
    }

    return (
        <>
            <LendingContext.Provider
                value={{
                    showSidebar: showAssetsSidebar,
                    setShowSidebar: setShowAssetsSidebar,
                    showStakingSidebar,
                    setShowStakingSidebar,
                    stakingSidebarSlug,
                    setStakingSidebarSlug
                }}
            >
                <StakingSidebar open={showStakingSidebar} hide={() => setShowStakingSidebar(false)} />

                <AssetSidebar open={showAssetsSidebar} hide={() => setShowAssetsSidebar(false)} markets={markets} />
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
