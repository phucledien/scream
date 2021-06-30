import { Modal } from '@geist-ui/react'

export default function AssetBreakdown({ open, asset, hide }) {
    return (
        <Modal open={open} onClose={hide} width="400px">
            <Modal.Content>
                <div className="space-y-8">
                    <div className="flex items-center space-x-2">
                        <img className="h-12" src={`/img/tokens/${asset.icon}`} alt="" />
                        <div className="text-4xl font-extrabold">{asset.name}</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-blue-400 font-medium">Available Liquidity</p>
                            <p className="text-xl">$23,132,321</p>
                        </div>
                        <div>
                            <p className="text-blue-400 font-medium">Utilization Rate</p>
                            <p className="text-xl">32%</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-400 font-medium text-xs">Market Details</p>

                        <div className="flex items-center">
                            <p className="flex-1">Price</p>
                            <p>$1232</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">Market Cap</p>
                            <p>$1,232,231</p>
                        </div>

                        <div className="flex items-center">
                            <p className="flex-1">{asset.name} Supply Cap</p>
                            <p>$1232</p>
                        </div>

                        <div className="opacity-25 flex items-center">
                            <p className="flex-1">...</p>
                            <p>...</p>
                        </div>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    )
}
