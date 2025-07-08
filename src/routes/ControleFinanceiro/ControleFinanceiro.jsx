import MenuLateral from "../../components/MenuLateral/MenuLateral";
import "./controleFinanceiro.css";

function ControleFinanceiro() {
    return(
        <div className="dashboard_container">
            <MenuLateral/>
            <main className="dashboard_main">
                <h1>Controle financeiro</h1>
            </main>
        </div>
    )
}

export default ControleFinanceiro;