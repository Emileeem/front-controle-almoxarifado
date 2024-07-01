import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
export default function Salas() {
    // VARIAVEIS MODAL
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
            {/* MODAL */}

            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Modal body text goes here.</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSaveChanges}>Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
            
            {/* FIM MODAL */}

            <Button variant="primary" onClick={handleOpenModal}>
                Open Modal
            </Button>
        </>
    )
}