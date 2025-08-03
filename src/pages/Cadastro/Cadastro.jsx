import "./Cadastro.css"
import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { cadastro } from '../../services/authService';

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (senha.length < 6) {
            setError("A senha deve ter no mínimo 6 caracteres.");
            setSuccess("");
            return;
        }

        if (senha !== confirmarSenha) {
            setError("As senhas devem ser iguais.");
            setSuccess("");
            return;
        }

        try {
            await cadastro(nome, email, senha);
            setError("");
            setSuccess("Cadastro realizado com sucesso!");


            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (erro) {
            console.log(erro);

            if (erro.message.includes('ORA-00001') || erro.message.includes('restrição exclusiva')) {
                setError("Este email já está cadastrado. Tente outro.");
            } else {
                setError("Erro ao realizar o cadastro. Tente novamente.");
            }
            setSuccess("");
        }
    }

    return (
        <div className="container_cadastro">
            <img src={Logo} alt="Logo do LifeBoard" />
            <section className="container_cadastro_form">
                <div className="container_cadastro_form_textos">
                    <h1>Bem-vindo ao LifeBoard</h1>
                    <p>Cadastre-se para acessar o painel de gestão</p>
                </div>

                <form onSubmit={handleCadastro}>

                    <div>
                        <label htmlFor="">Nome Completo</label>
                        <input
                            type="text"
                            placeholder="Digite seu nome"
                            required
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Senha</label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            required
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Confirmar senha</label>
                        <input
                            type="password"
                            placeholder="Confirme sua senha"
                            required
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            value={confirmarSenha}
                        />
                    </div>

                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>

                </form>

                <div className="container_mensagem_cadastro">
                    {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                    {error && <p className="mensagem_cadastro_erro">{error}</p>}
                </div>

                <div className="container_link_login">
                    <p className="link_login">Já possui uma conta? <button onClick={() => navigate("/")}>Entrar</button></p>
                </div>
            </section>
        </div>
    )
}

export default Cadastro;