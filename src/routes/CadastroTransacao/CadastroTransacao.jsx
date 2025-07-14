import MenuLateral from '../../components/MenuLateral/MenuLateral';
import './CadastroTransacao.css'

const CadastroTransacao = () => {
return (
        <div className="dashboard_container">
            <MenuLateral />
            <main className="dashboard_main_transacoes">
                <p>Controle Financeiro {'>'} Transações <span> {'>'} Cadastro de Transações</span></p>

                <div className='transacoes_container'>

                </div>
            </main>
        </div>
    )
}

export default CadastroTransacao;