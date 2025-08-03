import './Login.css'
import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { isTokenValid, login } from '../../services/authService';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isTokenValid()) {
            navigate('/controle-financeiro');
        }
    }, [navigate]);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, senha);

            setError('');
            navigate('/controle-financeiro');
        } catch (erro) {
            console.log(erro);
            setError('Email ou senha inválidos.');
        }
    }

    return (
        <div className="container_login">
            <img src={Logo} alt="Logo do LifeBoard" />
            <section className="container_login_form">
                <div className="container_login_form_textos">
                    <h1>Bem-Vindo de volta</h1>
                    <p>Entre com sua conta</p>
                </div>

                <form onSubmit={handleLogin}>
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
                        <button type="submit">Entrar</button>
                    </div>

                </form>

                <div className="container_mensagem_login">
                    {error && <p className="mensagem_login_erro">{error}</p>}
                </div>

                <div className="container_link_cadastro">
                    <p className="link_cadastro">Ainda não possui uma conta? <button onClick={() => navigate("/cadastro")}>Cadastre-se</button></p>
                </div>
            </section>
        </div>
    )
}

export default Login;
