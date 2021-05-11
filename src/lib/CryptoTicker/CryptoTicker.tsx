import Ticker from 'react-ticker'
import classNames from 'classnames'
import { tokens } from './useTicker'

export function TickerItem({ ticker, price, percentage }) {
    const isPositive = percentage >= 0

    return (
        <div className="inline-block">
            <div className="flex items-center space-x-4 p-4 border-r-4 border-rainbow">
                {/* <div>
                    <div className="w-5 h-5 rounded-full bg-gray-200" />
                </div> */}
                <div>
                    <p className="font-medium text-xs">{ticker}</p>
                    <div className="flex space-x-2 items-center">
                        <p>{price}</p>
                        <p className={classNames('text-xs', isPositive ? 'text-green-500' : 'text-red-500')}>{percentage}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CryptoTicker() {
    const coins = tokens

    return (
        <div className="w-full h-full whitespace-nowrap">
            <Ticker>{({ index }) => tokens.map((coin) => <TickerItem {...coin} />)}</Ticker>
        </div>
    )
}
