import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Metas.css';
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png"
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png"
import { useEffect, useState } from 'react';
import CardMeta from '../../components/CardMeta/CardMeta';
import { obterMetas } from '../../hooks/obterMetas';
import { adicionarSaldo, deletarMeta, editarDadosMeta, obterDadosMeta, retirarSaldo } from '../../services/metaService';
import ModalMetaDeletar from '../../components/ModalMetaDeletar/ModalMetaDeletar';
import ModalMetaAdicionar from '../../components/ModalMetaAdiconar/ModalMetaAdiconar';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import ModalMetaRetirar from '../../components/ModalMetaRetirar/ModalMetaRetirar';

const Metas = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [statusMeta, setStatusMeta] = useState('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState('');
    const [todasMetas, setTodasMetas] = useState([]);
    const [metas, setMetas] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [idMetaParaDeletar, setIdMetaParaDeletar] = useState(null);

    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [modalRetirar, setModalRetirar] = useState(false);
    const [idMetaParaAdicionar, setIdMetaParaAdicionar] = useState(null);
    const [valorAdicionar, setValorAdicionar] = useState('');
    const [valorRetirar, setValorRetirar] = useState('');

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {

                // Metas
                const metas = await obterMetas();
                setTodasMetas(metas);
                setMetas(metas);

            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    function formatarDataISOParaBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    const handleDeletar = (id) => {
        setIdMetaParaDeletar(id);
        setModalDelete(true);
    };

    const handleAdicionarSaldo = (id) => {
        setIdMetaParaAdicionar(id);
        setModalAdicionar(true);
    };

    const handleRetirarSaldo = (id) => {
        setIdMetaParaAdicionar(id);
        setModalRetirar(true);
    };

    const aplicarFiltros = () => {
        const dataLimiteFiltro = dataLimiteMeta ? new Date(dataLimiteMeta + "T23:59:59") : null;

        const metasFiltradas = todasMetas.filter((meta) => {
            const dataMeta = new Date(meta.data_limite);

            const statusOk = statusMeta ? meta.status === statusMeta : true;
            const dataLimiteOk = dataLimiteFiltro ? dataMeta <= dataLimiteFiltro : true;

            return statusOk && dataLimiteOk;
        });

        setMetas(metasFiltradas);
    };

    const limparFiltros = () => {
        setStatusMeta('');
        setDataLimiteMeta('');
        setMetas(todasMetas);
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_metas">
                <p>Controle Financeiro <span> {'>'} Metas</span></p>

                <div className='metas_container'>


                    <form className='metas_form'>

                        <div className='filtros_metas_form'>

                            <div className='metas_filtro'>
                                <label htmlFor="statusMeta">Status:</label>
                                <select
                                    id="statusMeta"
                                    name="statusMeta"
                                    value={statusMeta}
                                    onChange={(e) => setStatusMeta(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um Status</option>
                                    <option value="EM_ANDAMENTO">Em Andamento</option>
                                    <option value="CONCLUIDA">Concluída</option>
                                </select>
                            </div>

                            <div className='metas_filtro'>
                                <label htmlFor="dataLimite">Data Limite:</label>
                                <input
                                    id="dataLimite"
                                    type="date"
                                    name="dataLimite"
                                    value={dataLimiteMeta}
                                    onChange={(e) => setDataLimiteMeta(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='metas_botoes_filtro'>
                            <button type='button' onClick={aplicarFiltros}>Filtrar</button>
                            <button type='button' onClick={limparFiltros}>Limpar Filtros</button>
                            <button type='button' onClick={() => navigate("/cadastrar-meta")}>
                                Nova Meta
                            </button>
                        </div>
                    </form>

                    <div className='cards_metas_container'>

                        {metas.length > 0 ? (
                            metas
                                .slice() // para não mutar o array original
                                .sort((a, b) => {
                                    // Primeiro ordena por status:
                                    // Coloque "EM_ANDAMENTO" antes de "CONCLUIDA"
                                    if (a.status === b.status) {
                                        // Se status iguais, ordena pelo valor_meta (ex: crescente)
                                        return a.valor_meta - b.valor_meta;
                                    }
                                    if (a.status === "EM_ANDAMENTO") return -1;
                                    if (b.status === "EM_ANDAMENTO") return 1;
                                    return 0;
                                })
                                .map((meta) => {

                                    return (
                                        <CardMeta
                                            key={meta.id_meta}
                                            idMeta={meta.id_meta}
                                            iconeMeta={meta.status === "EM_ANDAMENTO" ? IconeMetaAndamento : IconeMetaConcluida}
                                            nomeMeta={meta.nome}
                                            valorMeta={meta.valor_meta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            valorAtual={meta.valor_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            valorMetaNum={meta.valor_meta}
                                            valorAtualNum={meta.valor_atual}
                                            dataLimite={formatarDataISOParaBR(meta.data_limite)}
                                            onDeletar={handleDeletar}
                                            onAdicionarSaldo={handleAdicionarSaldo}
                                            onRetirarSaldo={handleRetirarSaldo}
                                        />

                                    )
                                })
                        ) : (
                            <p>Nenhuma meta encontrada.</p>
                        )}


                    </div>

                </div>

                <ModalMetaDeletar
                    aberto={modalDelete}
                    onClose={() => setModalDelete(false)}
                    onDelete={async () => {
                        try {
                            await deletarMeta(idMetaParaDeletar);

                            const metasAtualizadas = await obterMetas();
                            setMetas(metasAtualizadas);

                            setModalDelete(false);
                            setIdMetaParaDeletar(null);
                        } catch (erro) {
                            console.error("Erro ao deletar meta:", erro);
                        }
                    }}
                />

                <ModalMetaAdicionar
                    aberto={modalAdicionar}
                    onClose={() => {
                        setModalAdicionar(false);
                        setValorAdicionar('');
                    }}
                    valorAdicionar={valorAdicionar}
                    setValorAdicionar={setValorAdicionar}
                    onAdicionar={async () => {
                        try {

                            // Adiciona valor ao saldo
                            await adicionarSaldo(idMetaParaAdicionar, valorAdicionar);

                            // Atualiza lista
                            const metasAtualizadas = await obterMetas();
                            setMetas(metasAtualizadas);

                            // Limpa tudo
                            setModalAdicionar(false);
                            setIdMetaParaAdicionar(null);
                            setValorAdicionar('');

                        } catch (erro) {
                            console.error("Erro ao adicionar saldo na meta:", erro);
                        }
                    }}
                />

                <ModalMetaRetirar
                    aberto={modalRetirar}
                    onClose={() => {
                        setModalRetirar(false);
                        setValorAdicionar('');
                    }}
                    valorRetirar={valorRetirar}
                    setValorRetirar={setValorRetirar}
                    onRetirar={async () => {
                        try {

                            // Adiciona valor ao saldo
                            await retirarSaldo(idMetaParaAdicionar, valorRetirar);

                            // Atualiza lista
                            const metasAtualizadas = await obterMetas();
                            setMetas(metasAtualizadas);

                            // Limpa tudo
                            setModalRetirar(false);
                            setIdMetaParaAdicionar(null);
                            setValorRetirar('');

                        } catch (erro) {
                            console.error("Erro ao retirar saldo na meta:", erro);
                        }
                    }}
                />
            </main>
        </div>
    )
}

export default Metas;