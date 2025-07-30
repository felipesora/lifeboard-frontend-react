import "./CardPequeno.css"
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"
import { useEffect, useRef, useState } from "react";



const CardPequeno = (props) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    }

    useEffect(() => {
            function handleClickOutside(event) {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setMenuAberto(false);
                }
            }
    
            if (menuAberto) {
                document.addEventListener("mousedown", handleClickOutside);
            }
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
    }, [menuAberto]);

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
                    <div className="card_pequeno_menu_container" ref={menuRef}>
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
