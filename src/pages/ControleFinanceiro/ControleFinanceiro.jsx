import CardPequeno from "../../components/CardPequeno/CardPequeno";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import IconeSaldo from "../../assets/images/icone-saldo.png";
import IconeSalario from "../../assets/images/icone-salario.png";
import IconeGastos from "../../assets/images/icone-cartao-credito.png";
import IconeTransacoes from "../../assets/images/icone-lista-preto.png";
import IconeGrafico from "../../assets/images/icone-grafico.png";
import IconeMetas from "../../assets/images/icone-metas-preto.png";
import "./ControleFinanceiro.css";
import CardTrasacao from "../../components/CardTransacao/CardTransacao";
import GastosMensaisGrafico from "../../components/GastosMensaisGrafico/GastosMensaisGrafico";
import { useEffect, useState } from "react";
import { obterDadosUsuario, editarFinanceiroUsuario } from "../../services/usuarioService";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import ModalDefinirSalario from "../../components/ModalDefinirSalario/ModalDefinirSalario";
import { obterTransacoes } from "../../utils/obterTransacoes";
import { useNavigate } from "react-router-dom";
import { obterMetas } from "../../utils/obterMetas";
import CardMetaControleFinanceiro from "../../components/CardMetaControleFinanceiro/CardMetaControleFinanceiro";
import IconeMetaAndamento from "../../assets/images/icone-meta-andamento.png"
import IconeMetaConcluida from "../../assets/images/icone-meta-concluida.png"
import Cabecalho from "../../components/Cabecalho/Cabecalho";

const ControleFinanceiro = () => {
    useAuthRedirect();
    const navigate = useNavigate();

    const [saldo, setSaldo] = useState(0);
    const [salario, setSalario] = useState(0);
    const [gastosMes, setGastosMes] = useState(0);
    const [gastosAno, setGastosAno] = useState(Array(12).fill(0));
    const [modalSalarioAberto, setModalSalarioAberto] = useState(false);
    const [transacoes, setTransacoes] = useState([]);
    const [metas, setMetas] = useState([]);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const usuario = await obterDadosUsuario(userId);

                // Saldo e salario
                setSaldo(usuario.financeiro.saldo_atual ?? 0);
                setSalario(usuario.financeiro.salario_mensal ?? 0);

                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const saidas = usuario.financeiro.transacoes.filter(transacao =>
                    transacao.tipo === "SAIDA"
                );

                // Gastos do mês atual
                const totalSaidasMes = saidas
                    .filter(transacao => {
                        const dataTransacao = new Date(transacao.data);
                        return (
                            dataTransacao.getMonth() === currentMonth &&
                            dataTransacao.getFullYear() === currentYear
                        );
                    })
                    .reduce((total, transacao) => total + transacao.valor, 0);


                // Gastos por mês no ano
                const gastosPorMes = Array(12).fill(0);
                saidas.forEach(transacao => {
                    const dataTransacao = new Date(transacao.data);
                    if (dataTransacao.getFullYear() === currentYear) {
                        const mes = dataTransacao.getMonth();
                        gastosPorMes[mes] += transacao.valor;
                    }
                });

                setGastosMes(totalSaidasMes);
                setGastosAno(gastosPorMes);


                // Transações
                const transacoes = await obterTransacoes();

                const ultimasTransacoes = transacoes
                    .sort((a, b) => new Date(b.data) - new Date(a.data))
                    .slice(0, 4);

                setTransacoes(ultimasTransacoes);

                // Metas
                const metas = await obterMetas();

                const melhoresMetas = metas
                    .sort((a, b) => {
                        // Primeiro ordena por status:
                        // Coloque "CONCLUIDA" antes de "EM_ANDAMENTO"
                        if (a.status === b.status) {
                            // Se status iguais, ordena pelo valor_meta (ex: crescente)
                            return a.valor_meta - b.valor_meta;
                        }
                        if (a.status === "CONCLUIDA") return -1;
                        if (b.status === "CONCLUIDA") return 1;
                        return 0;
                    })
                    .slice(0, 3);

                setMetas(melhoresMetas);



            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    const data = [
        { name: 'Jan', valor: gastosAno[0] },
        { name: 'Fev', valor: gastosAno[1] },
        { name: 'Mar', valor: gastosAno[2] },
        { name: 'Abr', valor: gastosAno[3] },
        { name: 'Mai', valor: gastosAno[4] },
        { name: 'Jun', valor: gastosAno[5] },
        { name: 'Jul', valor: gastosAno[6] },
        { name: 'Ago', valor: gastosAno[7] },
        { name: 'Set', valor: gastosAno[8] },
        { name: 'Out', valor: gastosAno[9] },
        { name: 'Nov', valor: gastosAno[10] },
        { name: 'Dez', valor: gastosAno[11] },
    ];

    const handleSalvarSalario = async (novoSalario) => {

        const userId = localStorage.getItem("userId");
        const usuario = await obterDadosUsuario(userId);

        const financeiroId = usuario.financeiro.id_financeiro;

        await editarFinanceiroUsuario(financeiroId, {
            saldo_atual: usuario.financeiro.saldo_atual,
            salario_mensal: Number(novoSalario),
            id_usuario: usuario.id_usuario,
        });

        setSalario(Number(novoSalario));
    };

    const abrirModal = () => {
        setModalSalarioAberto(true);
    };

    function formatarDataISOParaBR(dataISO) {
        if (!dataISO) return "";
        const [ano, mes, dia] = dataISO.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <main className="dashboard_main">

                <div className="dashboard_titulo">
                    <p>Controle Financeiro</p>
                </div>

                <div>
                    <div className="dashboard_cards_container">
                        <div className="dashboard_cards_pequenos_graficos">
                            <div className="dashboard_cards_pequenos">
                                <CardPequeno
                                    icone={IconeSaldo}
                                    descricao="Icone sacola de dinheiro"
                                    titulo="Saldo Atual"
                                    valor={saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    cor="#000000"
                                />
                                <CardPequeno
                                    icone={IconeSalario}
                                    descricao="Icone notas de dinheiro"
                                    titulo="Salário"
                                    valor={salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    cor="#2E7D32"
                                    mostrarMenu
                                    onAbrirModal={abrirModal}
                                />
                                <CardPequeno
                                    icone={IconeGastos}
                                    descricao="Icone cartão de crédito"
                                    titulo="Gastos do mês"
                                    valor={gastosMes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    cor="#A44A48"
                                />
                            </div>
                            <div className="dashboard_grafico">
                                <div className="card_grafico_titulo">
                                    <img src={IconeGrafico} alt="Icone de grafico" />
                                    <p>Gastos por Mês</p>
                                </div>
                                <GastosMensaisGrafico dados={data} />
                            </div>
                        </div>
                        <div className="card_transacoes">
                            <div>
                                <img src={IconeTransacoes} alt="Icone de lista" />
                                <p>Últimas Transações</p>
                            </div>
                            {transacoes.length > 0 ? (
                                transacoes.map((transacao) => {
                                    const tipo = transacao.tipo;
                                    let corFundo, corTexto, titulo;

                                    switch (tipo) {
                                        case "SAIDA":
                                            corFundo = "#FFEBEE";
                                            corTexto = "#A44A48";
                                            titulo = "Saída";
                                            break;
                                        case "ENTRADA":
                                            corFundo = "#E8F5E9";
                                            corTexto = "#2E7D32";
                                            titulo = "Entrada";
                                            break;
                                        case "APLICACAO":
                                            corFundo = "#E3F2FD";
                                            corTexto = "#1565C0";
                                            titulo = "Aplicação";
                                            break;
                                        case "RESGATE":
                                            corFundo = "#FFF8E1";
                                            corTexto = "#EF6C00";
                                            titulo = "Resgate";
                                            break;
                                    }

                                    const valorFormatado = transacao.valor.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    });

                                    const data = new Date(transacao.data).toLocaleDateString('pt-BR');

                                    return (
                                        <CardTrasacao
                                            key={transacao.id_transacao}
                                            corFundo={corFundo}
                                            corTexto={corTexto}
                                            titulo={titulo}
                                            valor={valorFormatado}
                                            descricao={transacao.descricao}
                                            data={data}
                                        />
                                    );
                                })
                            ) : (
                                <p className="sem-transacoes">Nenhuma transação encontrada.</p>
                            )}

                            {transacoes.length > 0 && (
                                <div className="card_transacoes_link">
                                    <button onClick={() => navigate("/transacoes")}>Ver mais...</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="card_metas">
                        <div className="card_metas_titulo">
                            <img src={IconeMetas} alt="Icone de cofrinho" />
                            <p>Minhas metas</p>
                        </div>
                        <div className="card_metas_lista">
                            {metas.length > 0 ? (
                                metas.map((meta) => {

                                    return (
                                        <CardMetaControleFinanceiro
                                            key={meta.id_meta}
                                            idMeta={meta.id_meta}
                                            iconeMeta={meta.status === "EM_ANDAMENTO" ? IconeMetaAndamento : IconeMetaConcluida}
                                            nomeMeta={meta.nome}
                                            valorMeta={meta.valor_meta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            valorAtual={meta.valor_atual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            valorMetaNum={meta.valor_meta}
                                            valorAtualNum={meta.valor_atual}
                                            dataLimite={formatarDataISOParaBR(meta.data_limite)}
                                        />
                                    );

                                })

                            ) : (
                                <div className="div_sem_metas">
                                    <p className="sem-transacoes">Nenhuma meta encontrada.</p>
                                </div>
                                
                            )}
                        </div>
                        {metas.length > 0 && (
                            <div className="card_metas_link">
                                <button onClick={() => navigate("/metas")}>Ver mais...</button>
                            </div>
                        )}
                    </div>
                </div>

                <ModalDefinirSalario
                    aberto={modalSalarioAberto}
                    onClose={() => setModalSalarioAberto(false)}
                    onSalvar={handleSalvarSalario}
                />
            </main>
        </div>
    )
}

export default ControleFinanceiro;