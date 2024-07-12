import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBar from '../../components/NavBarComponent/NavBar';
import styles from "./style.module.scss";
import SearchButton from '../../components/SearchButtonComponent/SearchButton';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import filtro from "../../../public/filter.png"

export default function Salas() {
    const [nome, setNome] = useState("");
    const [andar, setAndar] = useState("");
    const [tipoSala, setTipoSala] = useState("");
    const [tiposSalaOptions, setTiposSalaOptions] = useState([]);
    const [salas, setSalas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editandoSala, setEditandoSala] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSalas, setFilteredSalas] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');

    const handleTipoFiltroChange = (event) => {
        setTipoFiltro(event.target.value);
    };

    const filterSalas = (term, tipoFiltro) => {
        const filtered = salas.filter(sala =>
            sala.Nome.toLowerCase().includes(term.toLowerCase()) &&
            (tipoFiltro === '' || sala.TipoSalaID === Number(tipoFiltro))
        );
        setFilteredSalas(filtered);
    };

    useEffect(() => {
        filterSalas(searchTerm, tipoFiltro);
    }, [searchTerm, tipoFiltro, salas]);

    const fetchTiposSala = async () => {
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
    };

    const fetchSalas = async () => {
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
    };

    useEffect(() => {
        fetchTiposSala();
        fetchSalas();
    }, []);

    const handleOpenModal = (sala) => {
        if (sala) {
            setEditandoSala(sala);
            setNome(sala.Nome);
            setAndar(sala.Andar);
            setTipoSala(sala.TipoSalaID); // supondo que o ID do tipo de sala é TipoSalaID
        } else {
            setEditandoSala(null);
            setNome("");
            setAndar("");
            setTipoSala("");
        }
        setShowModal(true);
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

        let url = 'http://localhost:3000/api/sala/';
        let method = 'POST';

        if (editandoSala) {
            url += `${editandoSala.ID}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sala)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Sala ${editandoSala ? 'editada' : 'cadastrada'}:`, data);

                handleCloseModal();
                fetchSalas();
                toast.success(`Sala ${editandoSala ? 'editada' : 'adicionada'} com sucesso!`);
            } else {
                console.error(`Erro ao ${editandoSala ? 'editar' : 'cadastrar'} sala:`, response.statusText);
                toast.error(`Erro ao ${editandoSala ? 'editar' : 'adicionar'} sala. Por favor, tente novamente.`);
            }
        } catch (error) {
            console.error(`Erro ao ${editandoSala ? 'editar' : 'cadastrar'} sala:`, error);
            toast.error(`Erro ao ${editandoSala ? 'editar' : 'adicionar'} sala. Por favor, tente novamente.`);
        }
    };

    const handleExcluirSala = async (salaId) => {
        const willDelete = await swal({
            title: "Você tem certeza?",
            text: "Você tem certeza que quer deletar essa sala?",
            icon: "warning",
            dangerMode: true,
        });

        try {
            if (willDelete) {
                const response = await fetch(`http://localhost:3000/api/sala/${salaId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Sala excluída com sucesso.');
                    swal("Deletado!", "Sua sala foi deletada com sucesso!", "success");
                    fetchSalas();
                } else {
                    console.error('Erro ao excluir sala:', response.statusText);
                    toast.error('Erro ao excluir sala. Por favor, tente novamente.');
                }

            } else {
                console.log('Operação de exclusão cancelada.');
            }
        } catch (error) {
            console.error('Erro ao excluir sala:', error);
            toast.error('Erro ao excluir sala. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <NavBar />
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} className={styles.modal}>
                <Modal.Header className={styles.titulo}>
                    <Modal.Title>
                        {editandoSala ? 'Editar Sala' : 'Adicionar Sala'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    <form>
                        <b> Nome :</b>
                        <input
                            type="text"
                            required
                            className={styles.input}
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <b> Andar :</b>

                        <input
                            type="text"
                            required
                            className={styles.input}
                            value={andar}
                            onChange={(e) => setAndar(e.target.value)}
                        />

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
                    </form>
                </Modal.Body>

                <Modal.Footer className={styles.salvar}>
                    <Button variant="primary" onClick={handleCadastro} >
                        {editandoSala ? 'Salvar' : 'Adicionar'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={styles.inicio}>
                <div className={styles.divSearch}>
                    <SearchButton setSearchTerm={setSearchTerm} />
                    <div className={styles.dropdown}>
                        <select
                            value={tipoFiltro}
                            onChange={handleTipoFiltroChange}
                            className={styles.select}
                        >
                            <option value="">Todos</option>
                            {tiposSalaOptions.map((tipoSala) => (
                                <option key={tipoSala.ID} value={tipoSala.ID}>
                                    {tipoSala.Nome}
                                </option>
                            ))}
                        </select>
                        <img
                            src={filtro}
                            alt="filtro"
                            className={styles.filtro}
                        />
                    </div>
                </div>
                <Button variant="primary" onClick={() => handleOpenModal()} className={styles.botao}>
                    Adicionar +
                </Button>
            </div>

            <section>
                {filteredSalas.map((item) => (
                    <div key={item.ID}>
                        {tipoFiltro === '' || item.TipoSalaID === Number(tipoFiltro) ? (
                            <div className={styles.salas}>
                                <p>{item.Nome} - {item.Andar}</p>
                                <div className={styles.botoesaq}>
                                    <Button variant="primary" onClick={() => handleOpenModal(item)} className={styles.botoes}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleExcluirSala(item.ID)} className={styles.botoes}>
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                        <hr />
                    </div>
                ))}
            </section>

            <ToastContainer /> {/* Componente para exibir os toasts */}
        </>
    );
}
