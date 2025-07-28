import { useState } from "react";
import IconeMenu from "../../assets/images/icone-menu.png";
import Logo from "../../assets/images/logo-lifeboard-branca.png";
import './Cabecalho.css';
import MenuHamburger from "../MenuHamburger/MenuHamburger";

const Cabecalho = () => {

    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <header className="cabecalho">
            <div className="cabecalho_logo">
                <img src={Logo} alt="Logo LifeBoard" />
                <h1>LifeBoard</h1>
            </div>

            <div>
                <button className="cabecalho_menu_hamburger" onClick={toggleMenu}>
                    <img src={IconeMenu} alt="Icone de menu" />
                </button>
            </div>

            <div className={`menu_hamburguer ${menuAberto ? "ativo" : ""}`}>
                <MenuHamburger toggleMenu={toggleMenu} />
            </div>

            {/* Overlay (fundo escuro) */}
            {menuAberto && <div className="overlay" onClick={toggleMenu}></div>}
        </header>
    )
}

export default Cabecalho;