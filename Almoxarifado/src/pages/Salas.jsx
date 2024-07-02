import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import NavBar from '../components/NavBarComponent/NavBar';
import styles from "./style.module.scss"
import SearchButton from '../components/SearchButtonComponent/SearchButton';

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
            <div className={styles.inicio}>
                <SearchButton className={styles.barra}/>
                <Button variant="primary" onClick={handleOpenModal}>
                    Adicionar +
                </Button>
            </div>
        </>
    );
}
