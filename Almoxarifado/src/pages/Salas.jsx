import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBar from '../components/NavBarComponent/NavBar';
import styles from "./style.module.scss";
import SearchButton from '../components/SearchButtonComponent/SearchButton';

export default function Salas() {
    const [nome, setNome] = useState("");
    const [andar, setAndar] = useState("");
    const [tipoSala, setTipoSala] = useState("");
    const [tiposSalaOptions, setTiposSalaOptions] = useState([]);
    const [salas, setSalas] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchTiposSala() {
            try {
                const response = await fetch('http://localhost:3000/api/tipoSala/');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data) {
                        setTiposSalaOptions(data.data);
                    } else {
                        console.error('Resposta inválida da API de tipos de sala:', data);
                    }
                } else {
                    console.error('Erro ao buscar tipos de sala:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar tipos de sala:', error);
            }
        }
    
        async function fetchSalas() {
            try {
                const response = await fetch('http://localhost:3000/api/sala/');
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.data) {
                        setSalas(data.data);
                    } else {
                        console.error('Resposta inválida da API de salas:', data);
                    }
                } else {
                    console.error('Erro ao buscar salas:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao buscar salas:', error);
            }
        }
    
        fetchTiposSala();
        fetchSalas();
    }, []); ;

    const handleOpenModal = (salaId) => {
        setShowModal(true);
        // Aqui você pode adicionar lógica para pré-popular o modal com os dados da sala usando o salaId, se necessário
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCadastro = async () => {
        const sala = {
            nome: nome,
            andar: andar,
            tipoSala: tipoSala
        };

        try {
            const response = await fetch('http://localhost:3000/api/sala/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sala)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Sala cadastrada:', data);
                // Atualizar a lista de salas após o cadastro
                handleCloseModal();
            } else {
                console.error('Erro ao cadastrar sala:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar sala:', error);
        }
    };

    const handleExcluirSala = async (salaId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/sala/${salaId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Sala excluída com sucesso.');
                // Atualizar a lista de salas após a exclusão
                fetchSalas();
            } else {
                console.error('Erro ao excluir sala:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir sala:', error);
        }
    };

    return (
        <>
            <NavBar />
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} className={styles.modal}>
                <Modal.Header className={styles.titulo}>
                    <Modal.Title>
                        Adicionar Sala
                    </Modal.Title>   
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    <b> Nome :</b>
                    <input type="text" className={styles.input} value={nome} onChange={(e) => setNome(e.target.value)} />
                    <b> Andar :</b>
                    <input type="text" className={styles.input} value={andar} onChange={(e) => setAndar(e.target.value)} />
                    <b> Tipo de Sala :</b>
                    <select
                        name="Tipo de Sala"
                        id="tipoSala"
                        className={styles.select}
                        value={tipoSala}
                        onChange={(e) => setTipoSala(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {tiposSalaOptions.map((tipoSala) => (
                            <option key={tipoSala.ID} value={tipoSala.ID}>
                                {tipoSala.Nome}
                            </option>
                        ))}
                    </select>
                </Modal.Body>

                <Modal.Footer className={styles.salvar}>
                    <Button variant="primary" onClick={handleCadastro} > 
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

            <section>
                {salas.map((sala) => (
                    <div key={sala.id} className={styles.salas}>
                        <p>{sala.nome} - {sala.andar}</p>
                        <div className={styles.botoesaq}>
                            <Button variant="primary" onClick={() => handleOpenModal(sala.id)} className={styles.botoes}>
                                Editar
                            </Button>
                            <Button variant="danger" onClick={() => handleExcluirSala(sala.id)} className={styles.botoes}>
                                Excluir
                            </Button>
                        </div>
                    </div>
                ))}
                <hr />
            </section>
        </>
    );
}
