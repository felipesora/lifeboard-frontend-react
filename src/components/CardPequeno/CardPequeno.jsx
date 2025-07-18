import "./CardPequeno.css"
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"
import { useState } from "react";



const CardPequeno = (props) => {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    }

    const handleDefinirSalario = () => {
        setMenuAberto(false);
        if (props.onAbrirModal) {
            props.onAbrirModal(); // Notifica o componente pai
        }
    };

    return (
        <div className="card_pequeno">
            <div>
                <div>
                    <img src={props.icone} alt={props.descricao} />
                    <p>{props.titulo}</p>
                </div>
                {props.mostrarMenu && (
                    <div className="card_pequeno_menu_container">
                        <button
                            className="card_pequeno_icone_menu_vertical"
                            onClick={toggleMenu}
                        >
                            <img src={IconeMenuVertical} alt="Icone de três pontos" />
                        </button>

                        {menuAberto && (
                            <div className="card_pequeno_menu_suspenso">
                                <button onClick={handleDefinirSalario}>Definir Salário</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <h3 style={{ color: props.cor }}>{props.valor}</h3>

        </div>
    )
}

export default CardPequeno;
