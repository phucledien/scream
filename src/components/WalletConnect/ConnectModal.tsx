import { Modal, Button, Row, Col } from '@geist-ui/react'
import { connectorLocalStorageKey } from '../../hooks'
import config from './config'

export default function ConnectModal({ open, login, onDismiss = () => null }) {
    return (
        <Modal open={open} onClose={onDismiss}>
            <Modal.Title>Connect Wallet</Modal.Title>
            <Modal.Content>
                <div className="space-y-8">
                    {config.map((entry, index) => (
                        <Button
                            style={{ width: '100%' }}
                            key={index}
                            auto
                            onClick={() => {
                                login(entry.connectorId)
                                window.localStorage.setItem(connectorLocalStorageKey, entry.connectorId)
                                onDismiss()
                            }}
                            id={`wallet-connect-${entry.title.toLocaleLowerCase()}`}
                        >
                            <Row justify="space-between" align="middle" gap={0.8}>
                                <Col>{entry.title}</Col>
                                <Col>
                                    <entry.icon width="30" />
                                </Col>
                            </Row>
                        </Button>
                    ))}
                </div>
            </Modal.Content>
        </Modal>
    )
}
