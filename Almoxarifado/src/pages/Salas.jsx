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
            <Modal show={showModal} onHide={handleCloseModal} className={styles.modal}>
                <Modal.Header className={styles.titulo}>
                    <Modal.Title>
                        Adicionar Sala
                    </Modal.Title>   
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    <b> Nome :</b>
                    <input type="text" className={styles.input} />
                    <b> Andar :</b>
                    <input type="text" className={styles.input} />
                    <b> Tipo de Sala :</b>
                    <select name="Tipo de Sala" id="" className={styles.select}>
                        <option> Selecione </option>
                        <option > Laboratório </option>
                        <option > Maker </option>
                        <option > Sala de Aula </option>
                    </select>

                </Modal.Body>

                <Modal.Footer className={styles.salvar}>
                    <Button variant="primary" onClick={handleSaveChanges}> 
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={styles.inicio}>
                <SearchButton />
                <Button variant="primary" onClick={handleOpenModal} className={styles.botao}>
                    Adicionar +
                </Button>
            </div>
            <div className={styles.salas}>
                <p> Sala 1 - Andar Tal </p>
                <div className={styles.botoesaq}>
                    <Button variant="primary" onClick={handleOpenModal} className={styles.botoes}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={handleOpenModal} className={styles.botoes}>
                        Excluir
                    </Button>
                </div>
            </div>
            <hr />
            <div className={styles.salas}>
                <p> Sala 1 - Andar Tal </p>
                <div className={styles.botoesaq}>
                    <Button variant="primary" onClick={handleOpenModal} className={styles.botoes}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={handleOpenModal} className={styles.botoes}>
                        Excluir
                    </Button>
                </div>
            </div>
            <hr />
            <div className={styles.salas}>
                <p> Sala 1 - Andar Tal </p>
                <div className={styles.botoesaq}>
                    <Button variant="primary" onClick={handleOpenModal} className={styles.botoes}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={handleOpenModal} className={styles.botoes}>
                        Excluir
                    </Button>
                </div>
            </div>
            <hr />
            <div className={styles.salas}>
                <p> Sala 1 - Andar Tal </p>
                <div className={styles.botoesaq}>
                    <Button variant="primary" onClick={handleOpenModal} className={styles.botoes}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={handleOpenModal} className={styles.botoes}>
                        Excluir
                    </Button>
                </div>
            </div>
            <hr />

            <div className={styles.salas}>
                <p> Sala 1 - Andar Tal </p>
                <div className={styles.botoesaq}>
                    <Button variant="primary" onClick={handleOpenModal} className={styles.botoes}>
                        Editar
                    </Button>
                    <Button variant="danger" onClick={handleOpenModal} className={styles.botoes}>
                        Excluir
                    </Button>
                </div>
            </div>
            <hr />

        </>
    );
}
