import { useNavigate } from 'react-router-dom';
import MenuLateral from '../../components/MenuLateral';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
import './Kanban.css';
import IconeFazer from '../../assets/images/icone-tarefa-fazer.png';
import IconeAndamento from '../../assets/images/icone-tarefa-andamento.png';
import IconeConcluido from '../../assets/images/icone-tarefa-concluida.png';
import IconeAdicionar from '../../assets/images/icone-tarefa-adicionar.png';
import { useEffect, useState } from 'react';
import { obterTarefas } from '../../utils/obterTarefas';
import { editarDadosTarefa } from "../../services/tarefasService";
import { deletarTarefa } from "../../services/tarefasService";
import Cabecalho from "../../components/Cabecalho";
import ModalDeletarTarefa from '../../components/ModalDeletarTarefa/ModalDeletarTarefa';
import CardInfoTarefas from '../../components/CardInfoTarefas/CardInfoTarefas';
import CardTarefa from '../../components/CardTarefa/CardTarefa';

const Kanban = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [tarefas, setTarefas] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [idTarefaDeletar, setIdTarefaDeletar] = useState(null);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {
                const tarefas = await obterTarefas();
                setTarefas(tarefas);

            } catch (erro) {
                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    const calculaQuantidade = (status) => {
        const listaFiltrada = tarefas.filter(t => t.status === status);

        return listaFiltrada.length;
    }

    const detalhesPrioridade = (prioridade) => {
        switch (prioridade) {
            case "ALTA":
                return { titulo: "Alta", fundo: "#FFEBEE", texto: "#C62828" };
            case "MEDIA":
                return { titulo: "Média", fundo: "#FFF8E1", texto: "#F9A825" };
            case "BAIXA":
                return { titulo: "Baixa", fundo: "#E8F5E9", texto: "#2E7D32" };
            default:
                return { fundo: "#F5F5F5", texto: "#000000" };
        }
    }

    const prioridadeParaNumero = (prioridade) => {
        switch (prioridade) {
            case "ALTA": return 1;
            case "MEDIA": return 2;
            case "BAIXA": return 3;
            default: return 4;
        }
    };

    function formatarDataISOParaBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    const moverTarefa = async (tarefa, novoStatus) => {
        try {
            const tarefaAtualizada = { ...tarefa, status: novoStatus};
            await editarDadosTarefa(tarefa.id_tarefa, tarefaAtualizada);

            setTarefas(prev => prev.map(t =>
                t.id_tarefa === tarefa.id_tarefa ? tarefaAtualizada : t
            ))

        } catch (erro) {
            console.error("Erro ao mover tarefa:", erro);
        }
    }

    const handleDeletar = (id) => {
        setIdTarefaDeletar(id);
        setModalDelete(true);
    };

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main_tarefas_kanban">
                <p>Quadro (Kanban)</p>

                <div className='cards_tarefas_kanban'>
                    <CardInfoTarefas
                        icone={IconeFazer}
                        titulo="A Fazer"
                        descricao="Tarefas a fazer:"
                        quantidade={calculaQuantidade("A_FAZER")}
                        cor="#000000"
                    />

                    <CardInfoTarefas
                        icone={IconeAndamento}
                        titulo="Em Andamento"
                        descricao="Tarefas em andamento:"
                        quantidade={calculaQuantidade("EM_ANDAMENTO")}
                        cor="#42A5F5"
                    />

                    <CardInfoTarefas
                        icone={IconeConcluido}
                        titulo="Concluídas"
                        descricao="Tarefas concluídas:"
                        quantidade={calculaQuantidade("CONCLUIDA")}
                        cor="#4CAF50"
                    />
                </div>

                <div className='colunas_tarefas_kanban'>

                    <div className='coluna_tarefa'>
                        <div style={{ backgroundColor: "#90A4AE" }} className='coluna_tarefa_cabecalho'>
                            <p>A Fazer ({calculaQuantidade("A_FAZER")})</p>
                            <button onClick={() => navigate("/cadastrar-tarefa", { state: { from: "tarefas-quadro-kanban", status: "A_FAZER" } })}>
                                <img src={IconeAdicionar} alt="Icone de adicionar tarefa" />
                            </button>

                        </div>

                        <div className='coluna_tarefa_conteudo'>

                            {tarefas
                                .filter(t => t.status === "A_FAZER")
                                .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                                .map((tarefa) => (
                                    <CardTarefa
                                        key={tarefa.id_tarefa}
                                        tarefa={tarefa}
                                        moverTarefa={moverTarefa}
                                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                                        titulo={tarefa.titulo}
                                        descricao={tarefa.descricao}
                                        data={formatarDataISOParaBR(tarefa.data_limite)}
                                        onDeletar={handleDeletar}
                                    />
                                ))}

                        </div>
                    </div>


                    <div className='coluna_tarefa'>
                        <div style={{ backgroundColor: "#42A5F5" }} className='coluna_tarefa_cabecalho'>
                            <p>Em Andamento ({calculaQuantidade("EM_ANDAMENTO")})</p>
                            <button onClick={() => navigate("/cadastrar-tarefa", { state: { from: "tarefas-quadro-kanban", status: "EM_ANDAMENTO" } })}>
                                <img src={IconeAdicionar} alt="Icone de adicionar tarefa" />
                            </button>

                        </div>

                        <div className='coluna_tarefa_conteudo'>
                            {tarefas
                                .filter(t => t.status === "EM_ANDAMENTO")
                                .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                                .map((tarefa) => (
                                    <CardTarefa
                                        key={tarefa.id_tarefa}
                                        tarefa={tarefa}
                                        moverTarefa={moverTarefa}
                                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                                        titulo={tarefa.titulo}
                                        descricao={tarefa.descricao}
                                        data={formatarDataISOParaBR(tarefa.data_limite)}
                                        onDeletar={handleDeletar}
                                    />
                                ))}
                        </div>
                    </div>


                    <div className='coluna_tarefa'>
                        <div style={{ backgroundColor: "#4CAF50" }} className='coluna_tarefa_cabecalho'>
                            <p>Concluída ({calculaQuantidade("CONCLUIDA")})</p>
                            <button onClick={() => navigate("/cadastrar-tarefa", { state: { from: "tarefas-quadro-kanban", status: "CONCLUIDA" } })}>
                                <img src={IconeAdicionar} alt="Icone de adicionar tarefa" />
                            </button>

                        </div>

                        <div className='coluna_tarefa_conteudo'>
                            {tarefas
                                .filter(t => t.status === "CONCLUIDA")
                                .sort((a, b) => prioridadeParaNumero(a.prioridade) - prioridadeParaNumero(b.prioridade))
                                .map((tarefa) => (
                                    <CardTarefa
                                        key={tarefa.id_tarefa}
                                        tarefa={tarefa}
                                        moverTarefa={moverTarefa}
                                        corFundo={detalhesPrioridade(tarefa.prioridade).fundo}
                                        corTexto={detalhesPrioridade(tarefa.prioridade).texto}
                                        prioridade={detalhesPrioridade(tarefa.prioridade).titulo}
                                        titulo={tarefa.titulo}
                                        descricao={tarefa.descricao}
                                        data={formatarDataISOParaBR(tarefa.data_limite)}
                                        onDeletar={handleDeletar}
                                    />
                                ))}
                        </div>
                    </div>

                </div>
            </main>

            <ModalDeletarTarefa 
                aberto={modalDelete}
                onClose={() => setModalDelete(false)}
                onDelete={async () => {
                    try {
                        await deletarTarefa(idTarefaDeletar);

                        const tarefasAtualizadas = await obterTarefas();
                        setTarefas(tarefasAtualizadas);

                        setModalDelete(false);
                        setIdTarefaDeletar(null);
                    } catch (erro) {
                        console.error("Erro ao deletar tarefa:", erro);
                        alert("Erro ao deletar a tarefa. Por favor, tente novamente.");
                    }
                }}
            />
        </div>
    )
}

export default Kanban;