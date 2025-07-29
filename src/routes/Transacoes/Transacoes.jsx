import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Transacoes.css';
import { useEffect, useState, useRef } from 'react';
import { obterTransacoes } from '../../hooks/obterTransacoes';
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"
import ModalDeletarTransacao from '../../components/ModalDeletarTransacao/ModalDeletarTransacao';
import { deletarTransacao } from '../../services/transacaoService';
import Cabecalho from '../../components/Cabecalho/Cabecalho';

const Transacoes = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const [todasTransacoes, setTodasTransacoes] = useState([]);
    const [transacoes, setTransacoes] = useState([]);
    const [tipoTransacaoFiltro, setTipoTransacaoFiltro] = useState('');
    const [dataInicioFiltro, setDataInicioFiltro] = useState('');
    const [dataFimFiltro, setDataFimFiltro] = useState('');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);
    const [modalDelete, setModalDelete] = useState(false);
    const [idTransacaoParaDeletar, setIdTransacaoParaDeletar] = useState(null);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {

                // Transações
                const transacoes = await obterTransacoes();
                const transacoesOrdenadas = transacoes.sort((a, b) => {
                    const dataA = new Date(a.data);
                    const dataB = new Date(b.data);
                    return dataB - dataA; // Mais recente primeiro
                });

                setTodasTransacoes(transacoesOrdenadas);  // guardar a lista original
                setTransacoes(transacoesOrdenadas); // mostrar inicialmente todas

            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setTransacaoSelecionada(null);
            }
        }

        if (transacaoSelecionada !== null) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [transacaoSelecionada]);

    const formatarCategoria = (categoria) => {
        switch (categoria) {
            case 'ALIMENTACAO':
                return 'Alimentação';
            case 'TRANSPORTE':
                return 'Transporte';
            case 'LAZER':
                return 'Lazer';
            case 'SAUDE':
                return 'Saúde';
            case 'MORADIA':
                return 'Moradia';
            case 'OUTROS':
                return 'Outros';
            default:
                return categoria;
        }
    };

    const aplicarFiltros = () => {
        const dataFim = dataFimFiltro ? new Date(dataFimFiltro + "T23:59:59") : null;

        console.log('Filtro dataFim:', dataFim);

        const filtrosAtivos = todasTransacoes.filter((transacao) => {
            const dataTransacao = new Date(transacao.data);
            console.log('Data transacao:', dataTransacao);

            const tipoOk = tipoTransacaoFiltro ? transacao.tipo === tipoTransacaoFiltro : true;
            const categoriaOk = categoriaFiltro ? transacao.categoria === categoriaFiltro : true;
            const dataInicioOk = dataInicioFiltro ? dataTransacao >= new Date(dataInicioFiltro) : true;
            const dataFimOk = dataFim ? dataTransacao <= dataFim : true;

            console.log('Data fim ok:', dataFimOk);

            return tipoOk && categoriaOk && dataInicioOk && dataFimOk;
        });

        return filtrosAtivos;
    };

    const limparFiltros = () => {
        setTipoTransacaoFiltro('');
        setCategoriaFiltro('');
        setDataInicioFiltro('');
        setDataFimFiltro('');
        setTransacoes(todasTransacoes);
    };


    const handleEditar = (id) => {
        // Navegar para rota de edição, passando o ID
        navigate(`/editar-transacao/${id}`);
        setTransacaoSelecionada(null); // Fecha o menu
    };

    const handleDeletar = async (id) => {
        setIdTransacaoParaDeletar(id);   // define qual transação deletar
        setModalDelete(true);            // abre o modal
        setTransacaoSelecionada(null);
    };

    const abrirModal = () => {
        setModalSalarioAberto(true);
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_transacoes">
                <p>Controle Financeiro <span> {'>'} Transações</span></p>

                <div className='transacoes_container'>


                    <form className='transacoes_form'>

                        <div className='filtros_transacoes_form'>

                            <div className='trasacao_filtro'>
                                <label htmlFor="tipoTransacao">Tipo de Transação:</label>
                                <select
                                    id="tipoTransacao"
                                    name="tipoTransacao"
                                    value={tipoTransacaoFiltro}
                                    onChange={(e) => setTipoTransacaoFiltro(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um tipo</option>
                                    <option value="ENTRADA">Entrada</option>
                                    <option value="SAIDA">Saída</option>
                                </select>
                            </div>

                            <div className='trasacao_filtro'>
                                <label htmlFor="dataInicio">Data Início:</label>
                                <input
                                    id="dataInicio"
                                    type="date"
                                    name="dataInicio"
                                    value={dataInicioFiltro}
                                    onChange={(e) => setDataInicioFiltro(e.target.value)}
                                />
                            </div>

                            <div className='trasacao_filtro'>
                                <label htmlFor="dataFim">Data Fim:</label>
                                <input
                                    id="dataFim"
                                    type="date"
                                    name="dataFim"
                                    value={dataFimFiltro}
                                    onChange={(e) => setDataFimFiltro(e.target.value)}
                                />
                            </div>

                            <div className='trasacao_filtro'>
                                <label htmlFor="categoria">Categoria:</label>
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={categoriaFiltro}
                                    onChange={(e) => setCategoriaFiltro(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    <option value="ALIMENTACAO">Alimentação</option>
                                    <option value="TRANSPORTE">Transporte</option>
                                    <option value="MORADIA">Moradia</option>
                                    <option value="LAZER">Lazer</option>
                                    <option value="SALARIO">Salário</option>
                                    <option value="SAUDE">Saúde</option>
                                    <option value="OUTROS">Outros</option>
                                </select>
                            </div>

                        </div>

                        <div className='trasacao_botoes_filtro'>
                            <button type='button' onClick={() => setTransacoes(aplicarFiltros())}>Filtrar</button>
                            <button type='button' onClick={limparFiltros}>Limpar Filtros</button>
                            <button type='button' onClick={() => navigate("/cadastrar-transacao")}>
                                Cadastrar Transação
                            </button>
                        </div>
                    </form>

                    <div className="tabela_scroll_wrapper">
                        <table className="tabela_transacoes">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Categoria</th>
                                    <th>Data</th>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    {/* Coluna de ações */}
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {transacoes.length > 0 ? (
                                    transacoes.map((transacao, index) => {
                                        const isLastRows = index >= transacoes.length - 2;
                                        return (
                                            <tr key={transacao.id_transacao}>
                                                <td>{transacao.descricao}</td>
                                                <td>{formatarCategoria(transacao.categoria)}</td>
                                                <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                                                <td>
                                                    <span
                                                        style={{
                                                            color: transacao.tipo === 'ENTRADA' ? '#2E7D32' : '#A44A48'
                                                        }}
                                                    >
                                                        {transacao.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {transacao.valor.toLocaleString('pt-BR', {
                                                        style: 'currency',
                                                        currency: 'BRL',
                                                    })}
                                                </td>
                                                <td style={{ position: 'relative' }}>
                                                    <div
                                                        ref={transacaoSelecionada === transacao.id_transacao ? menuRef : null}
                                                        style={{ display: 'inline-block' }}
                                                    >
                                                        <button
                                                            className="menu_transacao_btn"
                                                            onClick={() => setTransacaoSelecionada(transacao.id_transacao)}
                                                        >
                                                            <img src={IconeMenuVertical} alt="Icone de três pontos" />
                                                        </button>
                                                        {transacaoSelecionada === transacao.id_transacao && (
                                                            <div className={`menu_transacao_dropdown ${isLastRows ? 'open-up' : ''}`}>
                                                                <button onClick={() => handleEditar(transacao.id_transacao)}>Editar</button>
                                                                <button onClick={() => handleDeletar(transacao.id_transacao)}>Deletar</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6">Nenhuma transação encontrada.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

                <ModalDeletarTransacao
                    aberto={modalDelete}
                    onClose={() => setModalDelete(false)}
                    onDelete={async () => {
                        try {
                            await deletarTransacao(idTransacaoParaDeletar);

                            // RECARREGAR do backend
                            const transacoesAtualizadas = await obterTransacoes();
                            const transacoesOrdenadas = transacoesAtualizadas.sort((a, b) => {
                                const dataA = new Date(a.data);
                                const dataB = new Date(b.data);
                                return dataB - dataA;
                            });

                            setTodasTransacoes(transacoesOrdenadas);
                            setTransacoes(transacoesOrdenadas);

                            setModalDelete(false);
                            setIdTransacaoParaDeletar(null);
                        } catch (erro) {
                            console.error("Erro ao deletar:", erro);
                        }
                    }}
                />
            </main>
        </div>
    )
}

export default Transacoes;