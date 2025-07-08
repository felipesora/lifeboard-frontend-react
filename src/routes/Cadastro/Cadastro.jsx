import "./cadastro.css"
import Logo from "../../assets/images/logo-lifeboard-azul.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacao, setConfirmacao] = useState("");
    const navigate = useNavigate();


    return (
        <div className="container_cadastro">
            <img src={Logo} alt="Logo do LifeBoard" />
            <section className="container_cadastro_form">
                <div className="container_cadastro_form_textos">
                    <h1>Bem-vindo ao LifeBoard</h1>
                    <p>Cadastre-se para acessar o painel de gestão</p>
                </div>

                <form>

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
                            onChange={(e) => setConfirmacao(e.target.value)}
                            value={confirmacao}
                            />
                    </div>

                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>

                </form>

                <div className="container_mensagem_cadastro">
                    {/* <p className="mensagem_cadastro_sucesso">Cadastro realizado com Sucesso!</p> */}
                    {/* <p className="mensagem_cadastro_erro">Email ou senha incorretos!</p> */}
                </div>

                <div className="container_link_login">
                    <p className="link_login">Já possui uma conta? <button onClick={() => navigate("/")}>Entrar</button></p>
                </div>
            </section>
        </div>
    )
}

export default Cadastro;