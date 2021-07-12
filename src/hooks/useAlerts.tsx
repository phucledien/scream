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
        completeTransactionAlert(tx)

        setTimeout(() => {
            const filtered = transactions.filter((transaction) => transaction.tx !== tx)
            setTransactions(filtered)
        }, 2000)
    }

    const completeTransactionAlert = (tx) => {
        const find = transactions.find((transaction) => transaction.tx === tx)
        if (!find) return

        find.complete = true
        const filtered = transactions.filter((transaction) => transaction.tx !== tx)

        setTransactions([...filtered, find])
    }

    return (
        <AlertsContext.Provider
            value={{
                transactions,
                setTransactions,
                triggerTransactionAlert,
                deleteTransactionAlert,
                completeTransactionAlert
            }}
        >
            <>
                <AnimatePresence>
                    <div className="space-y-2 max-w-xs w-full fixed bottom-6 right-6">
                        {transactions.map((transaction) => (
                            <LoaderModal tx={transaction.tx} complete={transaction.complete} />
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
