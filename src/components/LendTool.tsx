import { Button, Select, Input } from '@geist-ui/react'
import ToolWrapper from './ToolWrapper'

export default function LendTool() {
    return (
        <ToolWrapper title="Lend Assets">
            <div className="border-b border-gray-100 flex">
                <button type="button" className="flex-1 py-2 text-xs font-medium border-r ">
                    Lend
                </button>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-center">
                        <p className="text-xl font-bold flex-1">Lend Assets</p>

                        <Select placeholder="Frameworks">
                            <Select.Option value="react">React</Select.Option>
                            <Select.Option value="angular">Angular</Select.Option>
                            <Select.Option divider />
                            <Select.Option value="rails">Rails</Select.Option>
                            <Select.Option value="sinatra">Sinatra</Select.Option>
                        </Select>
                    </div>

                    <div>
                        <Input label="Amount" size="large" width="100%" placeholder="Enter an amount" />
                    </div>

                    <div className="flex">
                        <Button auto className="flex-1" type="secondary">
                            Connect Wallet
                        </Button>
                    </div>

                    <div className="rounded-xl bg-black text-white p-4 text-xs">
                        <p className="flex">
                            <span className="opacity-50 flex-1">Balance</span>
                            <span className="">-</span>
                        </p>
                        <p className="flex">
                            <span className="opacity-50 flex-1">Deposit APY</span>
                            <span className="">-</span>
                        </p>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    )
}
