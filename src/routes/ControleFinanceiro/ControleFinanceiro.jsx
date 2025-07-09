import CardPequeno from "../../components/CardPequeno/CardPequeno";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import IconeSaldo from "../../assets/images/icone-saldo.png";
import IconeSalario from "../../assets/images/icone-salario.png";
import IconeGastos from "../../assets/images/icone-cartao-credito.png";
import IconeTransacoes from "../../assets/images/icone-lista-preto.png";
import "./controleFinanceiro.css";
import CardTrasacao from "../../components/CardTransacao/CardTransacao";

function ControleFinanceiro() {
    return (
        <div className="dashboard_container">
            <MenuLateral />
            <main className="dashboard_main">
                <p>Controle financeiro</p>
                <div className="dashboard_cards_container">
                    <div className="dashboard_cards_pequenos">
                        <CardPequeno
                            icone={IconeSaldo}
                            descricao="Icone sacola de dinheiro"
                            titulo="Saldo Atual"
                            valor="7.000,00"
                            cor="#000000"
                        />
                        <CardPequeno
                            icone={IconeSalario}
                            descricao="Icone notas de dinheiro"
                            titulo="Salário"
                            valor="10.000,00"
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
            </main>
        </div>
    )
}

export default ControleFinanceiro;