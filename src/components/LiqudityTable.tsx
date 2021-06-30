import { Table } from '@geist-ui/react'
import Faker from 'faker'
import R from 'random'

export default function LiqudityTable() {
    const fakeCoin = {
        asset: Faker.finance.currencyCode(),
        liquidity: R.int(9999, 99999),
        supply: R.int(9999, 99999),
        borrow: R.int(9999, 99999)
    }

    const coins = new Array(10).fill(fakeCoin)

    return (
        <div className="space-y-4">
            <div className="overflow-auto hide-scroll-bars">
                <Table data={coins} className="whitespace-nowrap">
                    <Table.Column prop="asset" label="asset" />
                    <Table.Column prop="liquidity" label="total liquidity" />
                    <Table.Column prop="supply" label="total supply" />
                    <Table.Column prop="borrow" label="total borrow" />
                </Table>
            </div>
        </div>
    )
}
