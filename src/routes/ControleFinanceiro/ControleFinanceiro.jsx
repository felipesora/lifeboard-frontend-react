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

const ControleFinanceiro = () => {
    useAuthRedirect();

    const [saldo, setSaldo] = useState(0);
    const [salario, setSalario] = useState(0);
    const [gastosMes, setGastosMes] = useState(0);
    const [gastosAno, setGastosAno] = useState(Array(12).fill(0));
    const [modalSalarioAberto, setModalSalarioAberto] = useState(false);

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

                // Gastos do mês
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

    return (
        <div className="dashboard_container">
            <MenuLateral />
            <main className="dashboard_main">
                <p>Controle Financeiro</p>

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
                                    <p>Gráficos</p>
                                </div>
                                <GastosMensaisGrafico dados={data} />
                            </div>
                        </div>
                        <div className="card_transacoes">
                            <div>
                                <img src={IconeTransacoes} alt="Icone de lista" />
                                <p>Últimas Transações</p>
                            </div>
                            <CardTrasacao
                                corFundo="#FFEBEE"
                                corTexto="#A44A48"
                                titulo="Saída"
                                valor="300,00"
                                descricao="Mercado"
                                data="06/07/2025"
                            />
                            <CardTrasacao
                                corFundo="#E8F5E9"
                                corTexto="#2E7D32"
                                titulo="Entrada"
                                valor="2.500,00"
                                descricao="Salário"
                                data="06/07/2025"
                            />
                            <CardTrasacao
                                corFundo="#FFEBEE"
                                corTexto="#A44A48"
                                titulo="Saída"
                                valor="10,00"
                                descricao="Transporte"
                                data="06/07/2025"
                            />
                            <CardTrasacao
                                corFundo="#E8F5E9"
                                corTexto="#2E7D32"
                                titulo="Entrada"
                                valor="2.500,00"
                                descricao="Salário"
                                data="06/06/2025"
                            />
                            <div>
                                <button>Ver mais...</button>
                            </div>
                        </div>
                    </div>
                    <div className="card_metas">
                        <div className="card_metas_titulo">
                            <img src={IconeMetas} alt="Icone de cofrinho" />
                            <p>Minhas metas</p>
                        </div>
                        <div className="card_metas_lista">

                        </div>
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