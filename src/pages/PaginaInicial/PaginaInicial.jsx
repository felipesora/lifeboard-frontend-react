import './PaginaInicial.css';
import LogoAzul from '../../assets/images/logo-lifeboard-azul.png'
import ImagemDashboard from '../../assets/images/imagem-dashboard.png';
import ImagemControleFinanceiro from '../../assets/images/imagem-controle-financeiro.png';
import ImagemTransacoes from '../../assets/images/imagem-transacoes.png';
import ImagemMetas from '../../assets/images/imagem-metas.png';
import ImagemKanban from '../../assets/images/imagem-kanban.png';
import ImagemTarefas from '../../assets/images/imagem-tarefas.png';
import ImagemPomodoro from '../../assets/images/imagem-pomodoro.png';
import { useNavigate } from 'react-router-dom';
import CardFuncionalidade from '../../components/CardFuncionalidade/CardFuncionalidade';

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
                
                <section className='pagina_inicial_secao_funcionalidades'>
                    <div className='pagina_inicial_secao_funcionalidades_textos'>
                        <h2>Funcionalidades do LifeBoard</h2>
                        <h3>Explore todas as ferramentas para organizar finanças, tarefas e metas de forma prática.</h3>
                    </div>

                    <div className='pagina_inicial_secao_funcionalidades_cards'>

                        <CardFuncionalidade 
                            imagem={ImagemControleFinanceiro}
                            altImagem="Imagem de controle financeiro"
                            titulo="Controle Financeiro"
                            texto="Veja seu saldo, gastos do mês e acompanhe suas metas financeiras."
                        />

                        <CardFuncionalidade 
                            imagem={ImagemTransacoes}
                            altImagem="Imagem de transações"
                            titulo="Gerencie suas Transações"
                            texto="Cadastre entradas, saídas e investimentos facilmente."
                        />

                        <CardFuncionalidade 
                            imagem={ImagemMetas}
                            altImagem="Imagem de metas"
                            titulo="Acompanhe suas Metas"
                            texto="Adicione ou retire saldo e veja o progresso das suas metas."
                        />

                        <CardFuncionalidade 
                            imagem={ImagemKanban}
                            altImagem="Imagem de kanban"
                            titulo="Quadro Kanban"
                            texto="Organize tarefas arrastando cards entre colunas intuitivamente."
                        />

                        <CardFuncionalidade 
                            imagem={ImagemTarefas}
                            altImagem="Imagem de tarefas"
                            titulo="Tabela de Tarefas"
                            texto="Visualize todas as tarefas em uma lista organizada."
                        />

                        <CardFuncionalidade 
                            imagem={ImagemPomodoro}
                            altImagem="Imagem de pomodoro"
                            titulo="Pomodoro"
                            texto="Controle seu tempo e aumente a produtividade com ciclos Pomodoro."
                        />

                    </div>

                    <div className='pagina_inicial_secao_funcionalidades_botao'>
                        <button>
                            Experimente Gratuitamente
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default PaginaInicial;