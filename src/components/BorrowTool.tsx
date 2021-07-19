import { useEffect, useState } from 'react'
import RepayTab from './BorrowTabs/RepayTab'
import BorrowTab from './BorrowTabs/BorrowTab'
import ToolWrapper from './ToolWrapper'

export default function BorrowTool({ markets, update }) {
    const tabs = [{ slug: 'borrow' }, { slug: 'repay' }]
    const [tab, setTab] = useState(0)
    const activeTab = tabs[tab]

    return (
        <ToolWrapper title="Borrow Assets">
            <div className="border-b border-gray-100 flex">
                <button onClick={() => setTab(0)} type="button" className={`flex-1 py-2 text-xs font-medium border-r ${activeTab.slug === 'borrow' ? 'bg-white' : 'bg-gray-50'}`}>
                    Borrow
                </button>
                <button onClick={() => setTab(1)} type="button" className={`flex-1 py-2 text-xs font-medium ${activeTab.slug === 'repay' ? 'bg-white' : 'bg-gray-100'}`}>
                    Repay
                </button>
            </div>
            <div className="p-6">
                {activeTab.slug === 'repay' && <RepayTab markets={markets} update={update} />}
                {activeTab.slug === 'borrow' && <BorrowTab markets={markets} update={update} />}
            </div>
        </ToolWrapper>
    )
}
