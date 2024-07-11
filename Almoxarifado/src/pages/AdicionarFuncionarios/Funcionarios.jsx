import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBar from '../../components/NavBarComponent/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filtro from "../../../public/filter.png";
import SearchButton from '../../components/SearchButtonComponent/SearchButton';
import swal from 'sweetalert';
import styles from "./style.module.scss";

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [tiposFuncionarioOptions, setTiposFuncionarioOptions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editandoFuncionario, setEditandoFuncionario] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');

    // Campos do formulário
    const [formValues, setFormValues] = useState({
        nome: "",
        matricula: "",
        tipoFuncionario: "",
        cep: "",
        bairro: "",
        numero: "",
        complemento: "",
        email: "",
        senha: "",
        uf: "",
        cidade: "",
        rua: ""
    });

    useEffect(() => {
        filterFuncionarios(searchTerm, tipoFiltro);
    }, [searchTerm, tipoFiltro, funcionarios]);

    useEffect(() => {
        fetchTiposFuncionario();
        fetchFuncionarios();
    }, []);

    const handleTipoFiltroChange = (event) => {
        setTipoFiltro(event.target.value);
    };

    const filterFuncionarios = (term, tipoFiltro) => {
        const filtered = funcionarios.filter(funcionario =>
            funcionario.nome.toLowerCase().includes(term.toLowerCase()) &&
            (tipoFiltro === '' || funcionario.tipoFuncionario === Number(tipoFiltro))
        );
        setFilteredFuncionarios(filtered);
    };

    const fetchTiposFuncionario = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tipoFuncionario/');
            if (response.ok) {
                const data = await response.json();
                if (data && data.data) {
                    setTiposFuncionarioOptions(data.data);
                } else {
                    console.error('Resposta inválida da API de tipos de funcionário:', data);
                }
            } else {
                console.error('Erro ao buscar tipos de funcionário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar tipos de funcionário:', error);
        }
    };

    const fetchFuncionarios = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/funcionario/');
            if (response.ok) {
                const data = await response.json();
                if (data && data.data) {
                    setFuncionarios(data.data);
                } else {
                    console.error('Resposta inválida da API de funcionários:', data);
                }
            } else {
                console.error('Erro ao buscar funcionários:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    };

    const handleOpenModal = (funcionario) => {
        if (funcionario) {
            setEditandoFuncionario(funcionario);
            setFormValues({
                nome: funcionario.nome,
                matricula: funcionario.matricula,
                tipoFuncionario: funcionario.tipoFuncionario,
                cep: funcionario.cep,
                bairro: funcionario.bairro,
                numero: funcionario.numero,
                complemento: funcionario.complemento,
                email: funcionario.email,
                senha: funcionario.senha,
                uf: funcionario.uf,
                cidade: funcionario.cidade,
                rua: funcionario.rua
            });
        } else {
            setEditandoFuncionario(null);
            setFormValues({
                nome: "",
                matricula: "",
                tipoFuncionario: "",
                cep: "",
                bairro: "",
                numero: "",
                complemento: "",
                email: "",
                senha: "",
                uf: "",
                cidade: "",
                rua: ""
            });
        }
        setShowModal(true);
    };

    function pesquisacep(value) {
        console.log("CEP pesquisado:", value);
    
        fetch(`https://viacep.com.br/ws/${value}/json/`)
            .then(response => response.json())
            .then(data => {
                console.log("Resposta do CEP:", data);
    
                setFormValues({
                    ...formValues,
                    bairro: data.bairro,
                    uf: data.uf,
                    cidade: data.localidade,
                    rua: data.logradouro
                });
    
            })
            .catch(error => {
                console.error("Erro ao buscar CEP:", error);
            });
    }
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleCadastro = async () => {
        const funcionario = {
            nome: formValues.nome,
            matricula: formValues.matricula,
            tipoFuncionario: formValues.tipoFuncionario,
            cep: formValues.cep,
            bairro: formValues.bairro,
            numero: formValues.numero,
            complemento: formValues.complemento,
            email: formValues.email,
            senha: formValues.senha,
            uf: formValues.uf,
            cidade: formValues.cidade,
            rua: formValues.rua
            // Adicione outros campos do funcionário aqui conforme necessário
        };

        let url = 'http://localhost:3000/api/funcionario/';
        let method = 'POST';

        if (editandoFuncionario) {
            url += `${editandoFuncionario.ID}`;
            method = 'PUT';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(funcionario)
            });
            if (response.ok) {
                const data = await response.json();
                console.log(`Funcionário ${editandoFuncionario ? 'editado' : 'cadastrado'}:`, data);

                handleCloseModal();
                fetchFuncionarios();
                toast.success(`Funcionário ${editandoFuncionario ? 'editado' : 'adicionado'} com sucesso!`);
            } else {
                console.error(`Erro ao ${editandoFuncionario ? 'editar' : 'cadastrar'} funcionário:`, response.statusText);
                toast.error(`Erro ao ${editandoFuncionario ? 'editar' : 'adicionar'} funcionário. Por favor, tente novamente.`);
            }
        } catch (error) {
            console.error(`Erro ao ${editandoFuncionario ? 'editar' : 'cadastrar'} funcionário:`, error);
            toast.error(`Erro ao ${editandoFuncionario ? 'editar' : 'adicionar'} funcionário. Por favor, tente novamente.`);
        }
    };

    const handleExcluirFuncionario = async (funcionarioId) => {
        const willDelete = await swal({
            title: "Você tem certeza?",
            text: "Você tem certeza que quer deletar esse funcionário?",
            icon: "warning",
            dangerMode: true,
        });

        try {
            if (willDelete) {
                const response = await fetch(`http://localhost:3000/api/funcionario/${funcionarioId}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    console.log('Funcionário excluído com sucesso.');
                    swal("Deletado!", "Seu funcionário foi deletado com sucesso!", "success");
                    fetchFuncionarios();
                } else {
                    console.error('Erro ao excluir funcionário:', response.statusText);
                    toast.error('Erro ao excluir funcionário. Por favor, tente novamente.');
                }

            } else {
                console.log('Operação de exclusão cancelada.');
            }
        } catch (error) {
            console.error('Erro ao excluir funcionário:', error);
            toast.error('Erro ao excluir funcionário. Por favor, tente novamente.');
        }
    };

    return (
        <>
            <NavBar />
            {/* Modal */}
            <Modal show={showModal} onHide={handleCloseModal} className={styles.modal}>
                <Modal.Header className={styles.titulo}>
                    <Modal.Title>
                        {editandoFuncionario ? 'Editar Funcionário' : 'Adicionar Funcionário'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.body}>
                    <form className={styles.form}>
                        <div className={styles.nomeMat}>
                            <b> Nome :</b>
                            <input
                                type="text"
                                name="nome"
                                required
                                className={styles.input}
                                value={formValues.nome}
                                onChange={handleInputChange}
                            />
                            <b> Matrícula :</b>
                            <input
                                type="text"
                                name="matricula"
                                required
                                className={styles.input}
                                value={formValues.matricula}
                                onChange={handleInputChange}
                            />
                            <b> Email :</b>
                            <input
                                type="text"
                                name="email"
                                required
                                className={styles.input}
                                value={formValues.email}
                                onChange={handleInputChange}
                            />
                            <b> Senha :</b>
                            <input
                                type="password"
                                name="senha"
                                required
                                className={styles.input}
                                value={formValues.senha}
                                onChange={handleInputChange}
                            />
                            <b> Tipo de Funcionário :</b>
                            <select
                                name="tipoFuncionario"
                                id="tipoFuncionario"
                                className={styles.select}
                                value={formValues.tipoFuncionario}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                {tiposFuncionarioOptions.map((tipoFuncionario) => (
                                    <option key={tipoFuncionario.ID} value={tipoFuncionario.ID}>
                                        {tipoFuncionario.Nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.emailSenha}>
                            <b> Cep :</b>
                            <input
                                type="text"
                                name="cep"
                                required
                                className={styles.input}
                                value={formValues.cep}
                                onChange={handleInputChange}
                                onBlur={(e) => pesquisacep(e.target.value)}
                            />
                            <b> Bairro :</b>
                            <input
                                type="text"
                                name="bairro"
                                required
                                className={styles.input}
                                value={formValues.bairro}
                                onChange={handleInputChange}
                            />
                            <div className={styles.numComp}>
                                <div className={styles.numCompText}>
                                    <b> Numero :</b>
                                    <b> Complemento :</b>
                                </div>
                                <div className={styles.numCompInput}>
                                    <input
                                        type="text"
                                        name="numero"
                                        required
                                        className={styles.inputT}
                                        value={formValues.numero}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="complemento"
                                        required
                                        className={styles.input2}
                                        value={formValues.complemento}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className={styles.ufCity}>
                                    <div className={styles.ufCityText}>
                                        <b> UF :</b>
                                        <b> Cidade :</b>
                                    </div>
                                    <div className={styles.ufCityInput}>
                                        <input
                                            type="text"
                                            name="uf"
                                            required
                                            className={styles.input}
                                            value={formValues.uf}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="cidade"
                                            required
                                            className={styles.input}
                                            value={formValues.cidade}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    
                                    <b> Rua :</b>

                                    <input
                                        type="text"
                                        name="rua"
                                        required
                                        className={styles.input}
                                        value={formValues.rua}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer className={styles.salvar}>
                    <Button variant="primary" onClick={handleCadastro}>
                        {editandoFuncionario ? 'Salvar' : 'Adicionar'}
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
                            {tiposFuncionarioOptions.map((tipoFuncionario) => (
                                <option key={tipoFuncionario.ID} value={tipoFuncionario.ID}>
                                    {tipoFuncionario.Nome}
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
                {filteredFuncionarios.map((item) => (
                    <div key={item.ID}>
                        {tipoFiltro === '' || item.tipoFuncionario === Number(tipoFiltro) ? (
                            <div className={styles.funcionarios}>
                                <p>{item.nome} - {item.matricula}</p>
                                <div className={styles.botoesaq}>
                                    <Button variant="primary" onClick={() => handleOpenModal(item)} className={styles.botoes}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleExcluirFuncionario(item.ID)} className={styles.botoes}>
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ) : null}
                        <hr />
                    </div>
                ))}
            </section>

            <ToastContainer />
        </>
    );
}
