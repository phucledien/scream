import { createContext, useContext, useState } from 'react'
import nanoid from 'nanoid'
import { AnimatePresence } from 'framer-motion'
import LoaderModal from '../components/LoaderModal'

const AlertsContext = createContext({})

export function UseAlertsWrapper({ children }) {
    const [transactions, setTransactions] = useState([])

    const triggerTransactionAlert = (tx) => {
        const newTransaction = {
            tx
        }

        setTransactions((currentTransactions) => [...currentTransactions, newTransaction])
    }

    const deleteTransactionAlert = (tx) => {
        const filtered = transactions.filter((transaction) => transaction.tx !== tx)
        setTransactions(filtered)
    }

    return (
        <AlertsContext.Provider value={{ triggerTransactionAlert, deleteTransactionAlert }}>
            <>
                <AnimatePresence>
                    <div className="space-y-2 max-w-xs w-full fixed bottom-6 right-6">
                        {transactions.map((transaction) => (
                            <LoaderModal tx={transaction.tx} complete={false} />
                        ))}
                    </div>
                </AnimatePresence>

                {children}
            </>
        </AlertsContext.Provider>
    )
}

export default function useAlerts() {
    const context = useContext(AlertsContext)
    return { ...context }
}
