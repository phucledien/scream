import { Input, Progress, Note, Modal, Collapse } from '@geist-ui/react'

export default function DisclaimerModal() {
    return (
        <Modal open={true}>
            <Modal.Content>
                <div className="space-y-8">
                    <Note type="error">You need to know the risks.</Note>
                    <Collapse.Group>
                        <Collapse title="General DeFi Risks" initialVisible>
                            <p>
                                DeFi risks encapsulates a wide range of risks such as impermanent loss to risks of falling for scams such as wallet draining, private key being stolen, et cetera. Hence, DeFi users have to
                                be careful themselves and learn to educate themselves constantly in this space. You can find a guide to keeping your funds SAFU here.
                            </p>
                        </Collapse>
                        <Collapse title="3rd Party Risks">
                            <p>
                                Scream Finance serves as a yield aggregator by providing vaults which auto-compound rewards. However, vaults do not indicate any partnership or support by Scream Finance. We screen all new
                                vaults carefully to make sure your funds are safe but does not 100% guarantee safety.
                            </p>
                        </Collapse>
                        <Collapse title="Question B">
                            <p>
                                In the space of Crypto, especially in the Decentralised Finance (DeFi) space, users have to understand the risks of projects and smart contracts before venturing into DeFi. We call this
                                DYOR (do your own research).
                            </p>
                        </Collapse>
                    </Collapse.Group>
                </div>
            </Modal.Content>
        </Modal>
    )
}
