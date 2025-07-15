import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Metas.css';
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png"
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png"
import { useState } from 'react';
import CardMeta from '../../components/CardMeta/CardMeta';

const Metas = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [statusMeta, setStatusMeta] = useState('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState('');

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
                        <CardMeta 
                        iconeMeta={IconeMetaAndamento}
                        nomeMeta={"Viagem Praia"}
                        valorMeta={"R$ 5.000,00"}
                        valorAtingido={"R$ 1.500,00"}
                        dataLimite={"12/12/2025"}
                        />
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Metas;