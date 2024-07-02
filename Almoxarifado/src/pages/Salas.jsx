import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import NavBar from '../components/NavBarComponent/NavBar';
import styles from "./style.module.scss"

export default function Salas() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveChanges = () => {
        handleCloseModal();
    };

    return (
        <>
        <NavBar />
            {/* Botão Modal */}
            <Button variant="primary" onClick={handleOpenModal}>
                Open Modal
            </Button>

            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
