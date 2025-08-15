import './PaginaInicial.css';
import LogoAzul from '../../assets/images/logo-lifeboard-azul.png'
import ImagemDashboard from '../../assets/images/imagem-dashboard.png';
import { useNavigate } from 'react-router-dom';

const PaginaInicial = () => {
    const navigate = useNavigate();

    return (
        <div className='container_pagina_inicial'>

            <header className='pagina_inicial_cabecalho'>
                <img src={LogoAzul} alt="Logo da lifeboard" />

                <div className='pagina_inicial_cabecalho_botoes_entrar_cadastrar'>
                    <button className='pagina_inicial_cabecalho_btn_entrar' onClick={() => navigate("/")}>Fazer Login</button>
                    <button className='pagina_inicial_cabecalho_btn_cadastrar' onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
                </div>
            </header>

            <main>
                <section className='pagina_inicial_secao_apresentacao'>
                    <div>
                        <h1>Controle suas finanças e produtividade de forma inteligente</h1>
                        <h2>Organize suas finanças, tarefas e metas em um único painel interativo.</h2>
                        <div className='pagina_inicial_secao_apresentacao_botoes'>

                            <button className='pagina_inicial_secao_apresentacao_botao_comece_agora'>
                                Comece agora
                            </button>

                            <button className='pagina_inicial_secao_apresentacao_botao_funcionalidades'>
                                Ver funcionalidades
                            </button>
                        </div>
                    </div>
                    
                    <img src={ImagemDashboard} alt="Imagem de um dashboard" />
                </section>
            </main>
        </div>
    )
}

export default PaginaInicial;