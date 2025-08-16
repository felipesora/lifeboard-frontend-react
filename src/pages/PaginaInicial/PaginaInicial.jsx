import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import './PaginaInicial.css';
import LogoAzul from '../../assets/images/logo-lifeboard-azul.png';
import LogoBranca from '../../assets/images/logo-lifeboard-branca.png';
import ImagemDashboard from '../../assets/images/imagem-dashboard.png';
import ImagemControleFinanceiro from '../../assets/images/imagem-controle-financeiro.png';
import ImagemTransacoes from '../../assets/images/imagem-transacoes.png';
import ImagemMetas from '../../assets/images/imagem-metas.png';
import ImagemKanban from '../../assets/images/imagem-kanban.png';
import ImagemTarefas from '../../assets/images/imagem-tarefas.png';
import ImagemPomodoro from '../../assets/images/imagem-pomodoro.png';
import ImagemDemonstracaoControleFinanceiro from '../../assets/images/tela-controle-financeiro.png';
import ImagemDemonstracaoTransacoes from '../../assets/images/tela-transacoes.png';
import ImagemDemonstracaoMetas from '../../assets/images/tela-metas.png';
import ImagemDemonstracaoKanban from '../../assets/images/tela-kanban.png';
import ImagemDemonstracaoTarefas from '../../assets/images/tela-tarefas.png';
import ImagemDemonstracaoPomodoro from '../../assets/images/tela-pomodoro.png';
import { useNavigate } from 'react-router-dom';
import CardFuncionalidade from '../../components/CardFuncionalidade/CardFuncionalidade';
import CardDemonstracaoPagina from '../../components/CardDemonstracaoPagina/CardDemonstracaoPagina';
import LogoGithub from '../../assets/images/icone-github.png';
import LogoLinkedin from '../../assets/images/icone-linkedIn.png';
import LogoEmail from '../../assets/images/icone-email.png';

const PaginaInicial = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='container_pagina_inicial'>

            <header className='pagina_inicial_cabecalho' id="cabealho">
                <img src={LogoAzul} alt="Logo da lifeboard" />

                <div className='pagina_inicial_cabecalho_botoes_entrar_cadastrar'>
                    <button className='pagina_inicial_cabecalho_btn_entrar' onClick={() => navigate("/login")}>Fazer Login</button>
                    <button className='pagina_inicial_cabecalho_btn_cadastrar' onClick={() => navigate("/cadastro")}>Cadastrar-se</button>
                </div>
            </header>

            <main>
                <section className='pagina_inicial_secao_apresentacao'>
                    <div>
                        <h1>Controle suas finanças e produtividade de forma inteligente</h1>
                        <h2>Organize suas finanças, tarefas e metas em um único painel interativo.</h2>
                        <div className='pagina_inicial_secao_apresentacao_botoes'>

                            <button className='pagina_inicial_secao_apresentacao_botao_comece_agora' onClick={() => navigate("/cadastro")}>
                                Comece agora
                            </button>

                            <button className='pagina_inicial_secao_apresentacao_botao_funcionalidades' onClick={() => scrollToSection('funcionalidades')}>
                                Ver funcionalidades
                            </button>
                        </div>
                    </div>

                    <img src={ImagemDashboard} alt="Imagem de um dashboard" />
                </section>

                <section className='pagina_inicial_secao_funcionalidades' id="funcionalidades">
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
                        <button onClick={() => navigate("/cadastro")}>
                            Experimente Gratuitamente
                        </button>
                    </div>
                </section>

                <section className='pagina_inicial_secao_demontracao'>

                    <div className='pagina_inicial_secao_descricao_textos'>
                        <h2>Demonstração do LifeBoard</h2>
                        <h3>Explore as telas e funcionalidades do nosso painel de controle.</h3>
                    </div>

                    <div className='pagina_inicial_secao_demontracao_cards'>

                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation={true}
                            pagination={{ clickable: true }}
                            loop={true}
                            className="pagina_inicial_secao_demontracao_carrossel"
                        >

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoControleFinanceiro}
                                    descricao="Tela de Controle Financeiro"
                                    texto="Página de Controle Financeiro"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoTransacoes}
                                    descricao="Tela de Transações"
                                    texto="Página de Transações"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoMetas}
                                    descricao="Tela de Metas Financeiras"
                                    texto="Página de Metas Financeiras"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoKanban}
                                    descricao="Tela de Quadro Kanban"
                                    texto="Página de Quadro Kanban"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoTarefas}
                                    descricao="Tela de Tarefas"
                                    texto="Página de Tarefas"
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                <CardDemonstracaoPagina
                                    imagem={ImagemDemonstracaoPomodoro}
                                    descricao="Tela de Pomodoro"
                                    texto="Página de Pomodoro"
                                />
                            </SwiperSlide>

                        </Swiper>

                    </div>

                </section>

                <footer className='pagina_inicial_rodape'>
                    <div className="pagina_inicial_rodape_logo">
                        <button onClick={() => scrollToSection('cabealho')}>
                            <img src={LogoBranca} alt="Logo" />
                            <p>LifeBoard</p>
                        </button>
                        
                    </div>

                    <hr />

                    <div className="pagina_inicial_rodape_texto">
                        <p>© 2025 LifeBoard. Todos os direitos reservados.</p>

                        <div className="pagina_inicial_rodape_texto_links">
                            <div>
                                <a href="https://github.com/felipesora" target="_blank">
                                    <img src={LogoGithub} alt="Icone Github" />
                                </a>
                            </div>

                            <div>
                                <a href="https://www.linkedin.com/in/felipesora/" target="_blank">
                                    <img src={LogoLinkedin} alt="Icone Linkedin" />
                                </a>
                            </div>

                            <div>
                                <a href="mailto:felipeusora@gmail.com" target="_blank">
                                    <img src={LogoEmail} alt="Icone Email" />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    )
}

export default PaginaInicial;