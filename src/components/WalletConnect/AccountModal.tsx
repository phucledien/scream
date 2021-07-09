import { Modal, Button, Link } from '@geist-ui/react'
import { connectorLocalStorageKey } from '../../hooks';


export default function AccountModal({ open, account, logout, onDismiss = () => null }) {
    return (
        <Modal open={open} onClose={onDismiss}>
            <Modal.Title>Account</Modal.Title>
            <Modal.Subtitle>{account}</Modal.Subtitle>
            <Modal.Content style={{textAlign: 'center'}}>
                <Link href={`https://ftmscan.com/address/${account}`} target='_blank'>View on Ftmscan.</Link>
            </Modal.Content>
            <Modal.Action onClick={() => {
                logout();
                window.localStorage.removeItem(connectorLocalStorageKey);
                onDismiss();
            }}>Logout</Modal.Action>
        </Modal>
    )
}
