import "./CadastroMeta.css"
import { useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import { useState } from "react";
import { cadastrarMeta } from "../../services/metaService";
import Cabecalho from "../../components/Cabecalho";

const CadastroMeta = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [nomeMeta, setNomeMeta] = useState('');
    const [dataLimiteMeta, setDataLimiteMeta] = useState('');
    const [valorMeta, setValorMeta] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCadastroMeta = async () => {

        if (!nomeMeta.trim() || !dataLimiteMeta || !valorMeta) {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        if (nomeMeta.length < 3 || nomeMeta.length > 150) {
            setError("O nome deve ter entre 3 e 100 caracteres.");
            setSuccess("");
            return;
        }

        const valorConvertido = parseFloat(valorMeta);

        if (isNaN(valorConvertido) || valorConvertido <= 0) {
            setError('O valor da meta deve ser um número positivo.');
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

        const meta = {
            nome: nomeMeta,
            data_limite: dataLimiteMeta,
            valor_atual: 0,
            valor_meta: valorMeta,
        }

        try {
            await cadastrarMeta(meta);

            setError("");
            setSuccess("Meta cadastrada com sucesso!");

            setTimeout(() => {
                navigate("/metas");
            }, 1500);

        } catch (erro) {
            console.log(erro);

            setError("Erro ao cadastrar a meta. Tente novamente.");
            setSuccess("");
        }
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_cadastro_metas">
                <p>Controle Financeiro {'>'} Metas <span> {'>'} Cadastro de Metas</span></p>

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

                        </div>

                        <div className="container_mensagem_cadastro_metas">
                            {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                            {error && <p className="mensagem_cadastro_erro">{error}</p>}
                        </div>

                        <div className='botoes_form'>
                            <button type='button' onClick={() => navigate("/metas")}>Cancelar</button>
                            <button type='button' onClick={handleCadastroMeta}>Cadastrar Meta</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CadastroMeta;