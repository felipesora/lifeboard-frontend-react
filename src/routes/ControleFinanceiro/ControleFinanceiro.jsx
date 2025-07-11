import CardPequeno from "../../components/CardPequeno/CardPequeno";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import IconeSaldo from "../../assets/images/icone-saldo.png";
import IconeSalario from "../../assets/images/icone-salario.png";
import IconeGastos from "../../assets/images/icone-cartao-credito.png";
import IconeTransacoes from "../../assets/images/icone-lista-preto.png";
import IconeGrafico from "../../assets/images/icone-grafico.png";
import IconeMetas from "../../assets/images/icone-metas-preto.png";
import "./controleFinanceiro.css";
import CardTrasacao from "../../components/CardTransacao/CardTransacao";
import GastosMensaisGrafico from "../../components/GastosMensaisGrafico/GastosMensaisGrafico";
import { useEffect, useState } from "react";
import { obterDadosUsuario } from "../../services/usuarioService";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

function ControleFinanceiro() {
    useAuthRedirect();

    const [saldo, setSaldo] = useState(0);
    const [salario, setSalario] = useState(0);

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const usuario = await obterDadosUsuario(userId);

                setSaldo(usuario.financeiro.saldo_atual ?? 0);
                setSalario(usuario.financeiro.salario_mensal ?? 0);

                console.log("Usuário:", usuario);

            } catch (erro) {

                console.error("Erro ao obter dados do usuário:", erro);
            }
        };

        fetchDadosUsuario();
    }, []);

    const data = [
        { name: 'Jan', valor: 3000 },
        { name: 'Fev', valor: 5000 },
        { name: 'Mar', valor: 4200 },
        { name: 'Abr', valor: 3800 },
        { name: 'Mai', valor: 4500 },
        { name: 'Jun', valor: 3900 },
        { name: 'Jul', valor: 4700 },
        { name: 'Ago', valor: 5200 },
        { name: 'Set', valor: 4800 },
        { name: 'Out', valor: 5300 },
        { name: 'Nov', valor: 4900 },
        { name: 'Dez', valor: 5500 },
    ];

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
                                    valor={saldo}
                                    cor="#000000"
                                />
                                <CardPequeno
                                    icone={IconeSalario}
                                    descricao="Icone notas de dinheiro"
                                    titulo="Salário"
                                    valor={salario}
                                    cor="#2E7D32"
                                />
                                <CardPequeno
                                    icone={IconeGastos}
                                    descricao="Icone cartão de crédito"
                                    titulo="Gastos do mês"
                                    valor="5.000,00"
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
            </main>
        </div>
    )
}

export default ControleFinanceiro;