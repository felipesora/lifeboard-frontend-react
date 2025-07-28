import "./EditarMeta.css"
import { useNavigate, useParams } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useEffect, useState } from "react";
import { editarDadosMeta, obterDadosMeta } from "../../services/metaService";
import Cabecalho from "../../components/Cabecalho/Cabecalho";

const EditarMeta = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const { id } = useParams();

    const [nomeMeta, setNomeMeta] = useState('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState('');
    const [valorMeta, setValorMeta] = useState('');
    const [valorAtual, setValorAtual] = useState('');
    const [statusMeta, setStatusMeta] = useState('');
    const [idFinanceiro, setIdFinanceiro] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const dados = await obterDadosMeta(id);
                setNomeMeta(dados.nome);
                setDataLimiteMeta(dados.data_limite);
                setValorMeta(dados.valor_meta);
                setValorAtual(dados.valor_atual);
                setStatusMeta(dados.status)
                setIdFinanceiro(dados.id_financeiro);
            } catch (erro) {
                console.error(erro);
                setError("Erro ao carregar dados da meta.");
            }
        };

        fetchMeta();
    }, [id]);

    const handleEditarMeta = async () => {
        if (!nomeMeta.trim() || !dataLimiteMeta || !valorMeta || valorAtual === '') {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        const valorMetaConvertido = parseFloat(valorMeta);
        const valorAtualConvertido = parseFloat(valorAtual);

        if (isNaN(valorMetaConvertido) || valorMetaConvertido <= 0) {
            setError('O valor da meta deve ser um número positivo.');
            return;
        }

        if (isNaN(valorAtualConvertido) || valorAtualConvertido <= 0) {
            setError('O valor atual deve ser um número positivo.');
            return;
        }

        const dataSelecionada = new Date(dataLimiteMeta);
        const hoje = new Date();

        // Zera a hora de hoje para comparar apenas a data
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada <= hoje) {
            setError('A data limite da meta deve ser no futuro.');
            setSuccess('');
            return;
        }

        try {
            await editarDadosMeta(id, {
                nome: nomeMeta,
                valor_meta: valorMeta,
                valor_atual: valorAtual,
                data_limite: dataLimiteMeta,
                status: statusMeta,
                id_financeiro: idFinanceiro
            });

            setError("");
            setSuccess("Meta Financeira editada com sucesso!");

            setTimeout(() => {
                navigate("/metas");
            }, 1500);
        } catch (erro) {
            console.error(erro);
            setError("Erro ao editar a meta. Tente novamente.");
            setSuccess("");
        }
    };

    return (
        <div className="dashboard_container">
            <Cabecalho /> 
            <MenuLateral />
            <main className="dashboard_main_cadastro_metas">
                <p>Controle Financeiro {'>'} Metas <span> {'>'} Editar Meta</span></p>

                <div className='cadastro_metas_container'>

                    <form className='cadastro_metas_form'>
                        <div className='inputs_form'>

                            <div className='input_nome_meta'>
                                <label htmlFor="nomeMeta">Nome da Meta</label>
                                <input
                                    id="nomeMeta"
                                    type="text"
                                    name="nomeMeta"
                                    placeholder='Ex: Viagem para Europa'
                                    required
                                    value={nomeMeta}
                                    onChange={(e) => setNomeMeta(e.target.value)}
                                />
                            </div>

                            <div className='input_data_limite'>
                                <label htmlFor="dataLimite">Data Limite:</label>
                                <input
                                    id="dataLimite"
                                    type="date"
                                    name="dataLimite"
                                    value={dataLimiteMeta}
                                    onChange={(e) => setDataLimiteMeta(e.target.value)}
                                />
                            </div>

                            <div className='input_valor_meta'>
                                <label htmlFor="valorMeta">Valor da Meta</label>
                                <input
                                    id="valorMeta"
                                    type="number"
                                    step="any"
                                    name="valorMeta"
                                    placeholder='Ex: 10.000,00'
                                    required
                                    value={valorMeta}
                                    onChange={(e) => setValorMeta(e.target.value)}
                                />
                            </div>

                            <div className='input_valor_atual_meta'>
                                <label htmlFor="valorAtual">Valor Atual</label>
                                <input
                                    id="valorAtual"
                                    type="number"
                                    step="any"
                                    name="valorAtual"
                                    placeholder='Ex: 1.000,00'
                                    required
                                    value={valorAtual}
                                    onChange={(e) => setValorAtual(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="container_mensagem_cadastro_metas">
                            {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                            {error && <p className="mensagem_cadastro_erro">{error}</p>}
                        </div>

                        <div className='botoes_form'>
                            <button type='button' onClick={() => navigate("/metas")}>Cancelar</button>
                            <button type='button' onClick={handleEditarMeta}>Editar Meta</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default EditarMeta;