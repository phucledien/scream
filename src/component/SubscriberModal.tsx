import { Modal, Input, Button } from '@geist-ui/react'

export default function SubscribeModal({ visible, hide }) {
    return (
        <Modal open={visible} onClose={hide}>
            <Modal.Content>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-3xl font-extrabold text-center">Coming soon.</p>
                        <p>You can read more about our timeline on our documentation page. If you are interested in being notified about all the latest you need to know about Scream, subscribe below:</p>
                    </div>

                    <div className="space-y-2">
                        <Input placeholder="Enter your Email Address" width="100%"></Input>
                        <div className="flex">
                            <Button type="secondary" className="flex-1">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    )
}
