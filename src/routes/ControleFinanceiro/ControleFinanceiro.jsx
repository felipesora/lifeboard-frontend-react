import CardPequeno from "../../components/CardPequeno/CardPequeno";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import IconeSaldo from "../../assets/images/icone-saldo.png";
import IconeSalario from "../../assets/images/icone-salario.png";
import IconeGastos from "../../assets/images/icone-cartao-credito.png";

import "./controleFinanceiro.css";

function ControleFinanceiro() {
    return (
        <div className="dashboard_container">
            <MenuLateral />
            <main className="dashboard_main">
                <p>Controle financeiro</p>
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
            </main>
        </div>
    )
}

export default ControleFinanceiro;