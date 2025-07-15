import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Metas.css';
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png"
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png"
import { useEffect, useState } from 'react';
import CardMeta from '../../components/CardMeta/CardMeta';
import { obterMetas } from '../../hooks/obterMetas';

const Metas = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [statusMeta, setStatusMeta] = useState('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState('');
    const [metas, setMetas] = useState([]);

    useEffect(() => {
            const fetchDadosUsuario = async () => {
                try {
    
                    // Metas
                    const metas = await obterMetas();
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

    return (
        <div className="dashboard_container">
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
                            <button type='button'>Filtrar</button>
                            <button type='button'>Limpar Filtros</button>
                            <button type='button' onClick={() => navigate("/cadastrar-meta")}>
                                Nova Meta
                            </button>
                        </div>
                    </form>

                    <div className='cards_metas_container'>

                        {metas.length > 0 ? (
                            metas.map((meta) => {

                                return (
                                    <CardMeta 
                                    key={meta.id_meta}
                                    idMeta={meta.id_meta}
                                    iconeMeta={meta.status === "EM_ANDAMENTO" ? IconeMetaAndamento : IconeMetaConcluida}
                                    nomeMeta={meta.nome}
                                    valorMeta={meta.valor_meta.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
                                    valorAtual={meta.valor_atual.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
                                    valorMetaNum={meta.valor_meta}
                                    valorAtualNum={meta.valor_atual}
                                    dataLimite={formatarDataISOParaBR(meta.data_limite)}
                                    />
                                )
                            })
                        ) : (
                            <p>Nenhuma meta encontrada.</p>
                        )}

                        
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Metas;