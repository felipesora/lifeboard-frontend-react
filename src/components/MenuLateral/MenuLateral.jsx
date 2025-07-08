import IconeControleFinanceiro from "../../assets/images/icone-financeiro.png";
import IconeTransacoes from "../../assets/images/icone-transacoes.png";
import IconeMetas from "../../assets/images/icone-metas-branco.png";
import IconeKanban from "../../assets/images/icone-kanban.png";
import IconeTarefas from "../../assets/images/icone-lista-branco.png";
import IconePomodoro from "../../assets/images/icone-pomodoro.png";
import IconeUsuario from "../../assets/images/icone-user.png";
import IconeBarra from "../../assets/images/icone-barra.png";
import IconeSair from "../../assets/images/icone-logout.png";
import { useNavigate } from 'react-router-dom';
import './menuLateral.css';

function MenuLateral() {
    const navigate = useNavigate();

    return (
        <aside className='menu'>
            <div className='menu_logo'>
                <h2>LifeBoard</h2>
            </div>

            <nav className='menu_nav'>
                <p className="menu_section">Financeiro</p>
                <ul>
                    <li><img src={IconeControleFinanceiro} alt="Icone de bolsa de dinheiro" />Controle Financeiro</li>
                    <li><img src={IconeTransacoes} alt="Icone de nota de dinheiro" />Transações</li>
                    <li><img src={IconeMetas} alt="Icone de cofrinho" />Metas</li>
                </ul>

                <p className="menu_section menu_section_2">Tarefas</p>
                <ul>
                    <li><img src={IconeKanban} alt="Icone de papel com anotações" />Quadro (Kanban)</li>
                    <li><img src={IconeTarefas} alt="Icone de uma lista" />Minhas Tarefas</li>
                    <li><img src={IconePomodoro} alt="Icone de relogio" />Pomodoro</li>
                </ul>
            </nav>

            <div className='menu_footer'>
                <button><img src={IconeUsuario} alt="Icone de usuário" /></button>
                <img src={IconeBarra} alt="Icone de barra vertical" />
                <button><img src={IconeSair} alt="Icone de sair" /></button>
            </div>

        </aside>
    )
}

export default MenuLateral;