import IconeMenu from "../../assets/images/icone-menu.png";
import Logo from "../../assets/images/logo-lifeboard-branca.png";
import './Cabecalho.css';

const Cabecalho = () => {

    return (
        <header className="cabecalho">
            <div className="cabecalho_logo">
                <img src={Logo} alt="Logo LifeBoard" />
                <h1>LifeBoard</h1>
            </div>

            <div>
                <button className="cabecalho_menu_hamburger">
                    <img src={IconeMenu} alt="Icone de menu" />
                </button>
            </div>
        </header>
    )
}

export default Cabecalho;