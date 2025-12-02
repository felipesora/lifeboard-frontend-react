import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Conta.css';
import { useEffect, useState } from 'react';
import { atualizarFotoPefil, deletarUsuario, editarDadosUsuario, obterDadosUsuario, obterFotoPerfil, removerFotoPerfil } from '../../services/usuarioService';
import ModalDeletarConta from '../../components/ModalDeletarConta/ModalDeletarConta';
import Cabecalho from "../../components/Cabecalho";
import FotoPefilPadrao from "../../assets/images/foto-perfil-padrao.png";
import IconeEditarFoto from "../../assets/images/icone-editar-foto-perfil.png";
import IconeRemoverFoto from "../../assets/images/icone-remover-foto-perfil.png";

const Conta = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [nomeEditar, setNomeEditar] = useState('');
    const [emailEditar, setEmailEditar] = useState('');
    const [senhaEditar, setSenhaEditar] = useState('');
    const [senhaConfirmarEditar, setSenhaConfirmarEditar] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [modalContaAberto, setModalContaAberto] = useState(false);
    const [confirmarExclusao, setConfirmarExclusao] = useState('');

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {

                const id = localStorage.getItem("userId");

                const usuario = await obterDadosUsuario(id);
                setNome(usuario.nome);
                setEmail(usuario.email);
                setNomeEditar(usuario.nome);
                setEmailEditar(usuario.email);

            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    useEffect(() => {
        const fetchFotoPerfil = async () => {
            try {
                const blob = await  obterFotoPerfil();

                if (blob instanceof Blob && blob.size > 0) {
                    setFotoPerfil(URL.createObjectURL(blob));
                } else {
                    setFotoPerfil(FotoPefilPadrao);
                }
                console.log(fotoPerfil);

            } catch (error) {
                console.error("Erro ao carregar foto de perfil:", error);
            }
        };

        fetchFotoPerfil();
    }, []);

    const handleAtualzarFoto = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            await atualizarFotoPefil(formData);

            const novaImagem = URL.createObjectURL(file);
            setFotoPerfil(novaImagem);

        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
        }
    };

    const handleRemoverFoto = async () => {
        try {
            await removerFotoPerfil();
            setFotoPerfil(FotoPefilPadrao);

        } catch (error) {
            console.error("Erro ao remover foto: ", error);
        }
    }

    const handleEditarConta = async (e) => {
        e.preventDefault();

        if (!nomeEditar || !emailEditar || !senhaEditar || !senhaConfirmarEditar) {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        if (senhaEditar.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            setSuccess("");
            return;
        }

        if (senhaEditar !== senhaConfirmarEditar) {
            setError("As senhas devem ser iguais.");
            setSuccess("");
            return;
        }

        const dados = {
            nome: nomeEditar,
            email: emailEditar,
            senha: senhaEditar
        };

        try {
            const id = localStorage.getItem("userId");
            await editarDadosUsuario(id, dados);

            setError("");
            setSuccess("Dados atualizados com sucesso!");

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (erro) {
            console.log(erro);

            setError("Erro ao editar os dados. Tente novamente.");
            setSuccess("");
        }
    };

    const handleDeletarConta = async () => {
        if (confirmarExclusao != "excluir conta") {
            alert("Você precisa digitar exatamente: excluir conta");
            return;
        }

        try {
            const id = localStorage.getItem("userId");
            await deletarUsuario(id);

            localStorage.clear();
            navigate("/");
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            alert("Erro ao deletar conta. Tente novamente.");
        }
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_conta">
                <p>Minha Conta</p>

                <div className='conta_container'>

                    <div className='dados_conta'>

                        <div className="foto_perfil_container">
                            {fotoPerfil ? (
                                <div className="foto_perfil_conteudo">
                                    <img src={fotoPerfil} alt="Foto de perfil" className="foto_perfil" />

                                    <label htmlFor="inputFotoPerfil" className="botao_editar_foto" title="Atualizar Foto de Perfil">
                                        <img src={IconeEditarFoto} alt="Ícone de editar" />
                                    </label>

                                    <input
                                        type="file"
                                        id="inputFotoPerfil"
                                        accept="image/*"
                                        onChange={handleAtualzarFoto}
                                        style={{ display: 'none' }}
                                    />

                                    <button onClick={handleRemoverFoto} className='botao_remover_foto' title="Remover Foto de Perfil">
                                        <img src={IconeRemoverFoto} alt="ícone de remover foto" />
                                    </button>
                                </div>
                            ) : (
                                <p>Carregando imagem...</p>
                            )}
                        </div>

                        <div>
                            <p>Nome: <span>{nome}</span></p>
                        </div>

                        <div>
                            <p>Email: <span>{email}</span></p>
                        </div>

                        <div>
                            <p>Senha: <span>********</span></p>
                        </div>

                    </div>  

                    <div className='container_editar_conta'>
                        <h2>Quer editar seus dados?</h2>

                        <form className='form_editar_conta' onSubmit={handleEditarConta}>
                            <div className='inputs_editar_conta'>
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nomeEditar}
                                    onChange={(e) => setNomeEditar(e.target.value)} />

                            </div>

                            <div className='inputs_editar_conta'>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={emailEditar}
                                    onChange={(e) => setEmailEditar(e.target.value)} />

                            </div>

                            <div className='inputs_editar_conta'>
                                <label htmlFor="senha">Nova senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    value={senhaEditar}
                                    onChange={(e) => setSenhaEditar(e.target.value)} />

                            </div>

                            <div className='inputs_editar_conta'>
                                <label htmlFor="senhaCorfirmar">Confirmar senha:</label>
                                <input
                                    type="password"
                                    id="senhaCorfirmar"
                                    value={senhaConfirmarEditar}
                                    onChange={(e) => setSenhaConfirmarEditar(e.target.value)} />

                            </div>

                            <div className="container_mensagem_cadastro_metas">
                                {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                                {error && <p className="mensagem_cadastro_erro">{error}</p>}
                            </div>

                            <div className='botao_editar_conta'>
                                <button>Salvar Alterações</button>
                            </div>
                        </form>
                    </div>

                    <div className='botao_excluir_conta'>
                        <button onClick={() => setModalContaAberto(true)}>Excluir Conta</button>
                    </div>
                </div>

                <ModalDeletarConta
                    aberto={modalContaAberto}
                    onClose={() => setModalContaAberto(false)}
                    onDelete={handleDeletarConta}
                    confirmarExclusao={confirmarExclusao}
                    setConfirmarExclusao={setConfirmarExclusao}
                />

            </main>
        </div>
    )
}

export default Conta;