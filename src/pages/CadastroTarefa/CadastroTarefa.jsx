import "./CadastroTarefa.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import MenuLateral from "../../components/MenuLateral";
import { useState } from "react";
import { cadastrarTarefa } from "../../services/tarefasService";
import Cabecalho from "../../components/Cabecalho";

const CadastroTarefa = () => {
    useAuthRedirect();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from || "tarefas-quadro-kanban";
    const statusInicial = location.state?.status || "A_FAZER";

    const [tituloTarefa, setTituloTarefa] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataLimite, setDataLimite] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [status, setStatus] = useState(statusInicial);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCadastroTarefa = async () => {

        if (!tituloTarefa.trim() || !descricao || !dataLimite || !prioridade) {
            setError("Preencha todos os campos.");
            setSuccess("");
            return;
        }

        if (tituloTarefa.length < 3 || tituloTarefa.length > 150) {
            setError("O título deve ter entre 3 e 100 caracteres.");
            setSuccess("");
            return;
        }

        if (descricao.length < 3 || descricao.length > 150) {
            setError("A descrição deve ter entre 3 e 100 caracteres.");
            setSuccess("");
            return;
        }

        const dataSelecionada = new Date(dataLimite);
        const hoje = new Date();

        // Zera a hora de hoje para comparar apenas a data
        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada <= hoje) {
            setError('A data limite da tarefa deve ser no futuro.');
            setSuccess('');
            return;
        }

        const tarefa = {
            titulo: tituloTarefa,
            descricao: descricao,
            prioridade: prioridade,
            status: status,
            data_limite: dataLimite,
        }

        try {
            await cadastrarTarefa(tarefa);

            setError("");
            setSuccess("Tarefa cadastrada com sucesso!");

            setTimeout(() => {
                navigate(fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas");
            }, 1500);

        } catch (erro) {
            console.log(erro);

            setError("Erro ao cadastrar a tarefa. Tente novamente.");
            setSuccess("");
        }
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_cadastro_tarefas">
                <p>Minhas tarefas<span> {'>'} Cadastro de Tarefas</span></p>

                <div className='cadastro_tarefas_container'>

                    <form className='cadastro_tarefas_form'>
                        <div className='inputs_form_tarefa'>

                            <div className='input_titulo_tarefa'>
                                <label htmlFor="tituloTarefa">Título da Tarefa</label>
                                <input
                                    id="tituloTarefa"
                                    type="text"
                                    name="tituloTarefa"
                                    placeholder='Ex: Arrumar a cama'
                                    required
                                    value={tituloTarefa}
                                    onChange={(e) => setTituloTarefa(e.target.value)}
                                />
                            </div>

                            <div className='input_descricao_tarefa'>
                                <label htmlFor="descricao">Descrição</label>
                                <input
                                    id="descricao"
                                    type="text"
                                    name="descricao"
                                    required
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </div>

                            <div className='input_prioridade'>
                                <label htmlFor="prioridade">Prioridade</label>
                                <select
                                    id="prioridade"
                                    name="prioridade"
                                    required
                                    value={prioridade}
                                    onChange={(e) => setPrioridade(e.target.value)}
                                >
                                    <option value="" disabled>Selecione uma prioridade</option>
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                    
                                </select>
                            </div>

                            <div className='input_data_limite'>
                                <label htmlFor="dataLimite">Data Limite:</label>
                                <input
                                    id="dataLimite"
                                    type="date"
                                    name="dataLimite"
                                    value={dataLimite}
                                    onChange={(e) => setDataLimite(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="container_mensagem_cadastro_tarefas">
                            {success && <p className="mensagem_cadastro_sucesso">{success}</p>}
                            {error && <p className="mensagem_cadastro_erro">{error}</p>}
                        </div>

                        <div className='botoes_form_tarefas'>
                            <button type='button' onClick={() => navigate(fromPage === "tarefas-quadro-kanban" ? "/tarefas-quadro-kanban" : "/minhas-tarefas")}>Cancelar</button>
                            <button type='button' onClick={handleCadastroTarefa}>Cadastrar Tarefa</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CadastroTarefa;