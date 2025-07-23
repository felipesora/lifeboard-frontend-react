import "./CardTarefaColuna.css";
import IconeData from "../../assets/images/icone-tarefa-data-limite.png";
import IconeMenu from "../../assets/images/icone-menu-vertical.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CardTarefaColuna = (props) => {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const [menuMoverAberto, setMenuMoverAberto] = useState(false);
    const menuRef = useRef(null);
    const moverRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            const clicouForaMenu = menuRef.current && !menuRef.current.contains(event.target);
            const clicouForaMover = moverRef.current && !moverRef.current.contains(event.target);

            if (menuAberto && clicouForaMenu) {
                setMenuAberto(false);
            }

            if (menuMoverAberto && clicouForaMover) {
                setMenuMoverAberto(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuAberto, menuMoverAberto]);

    const toggleMenu = () => {
        setMenuAberto((prev) => !prev);
        setMenuMoverAberto(false);
    };

    const abrirMover = () => {
        setMenuMoverAberto(true);
        setMenuAberto(false); // fecha o menu principal
    };

    const moverPara = (novoStatus) => {
        props.moverTarefa(props.tarefa, novoStatus);
        setMenuAberto(false);
        setMenuMoverAberto(false);
    };

    const handleEditar = () => {
        navigate(`/editar-tarefa/${props.tarefa.id_tarefa}`);
        setMenuAberto(false);
    };

    return (
        <div className="card_tarefa_coluna">
            <div>
                <div className="card_tarefa_coluna_cabecalho">
                    <div style={{ backgroundColor: props.corFundo }} className="card_tarefa_coluna_cabecalho_prioridade">
                        <p style={{ color: props.corTexto }}>Prioridade {props.prioridade}</p>
                    </div>

                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button onClick={toggleMenu}>
                            <img src={IconeMenu} alt="Ícone menu vertical" />
                        </button>

                        {menuAberto && (
                            <div ref={menuRef} className="menu_tarefa_dropdown">
                                <button onClick={abrirMover}>Mover</button>
                                <button onClick={handleEditar}>Editar</button>
                                <button>Deletar</button>
                            </div>
                        )}

                        {menuMoverAberto && (
                            <div ref={moverRef} className="menu_tarefa_mover_dropdown" style={{ marginTop: '4px' }}>
                                <button onClick={() => moverPara("A_FAZER")}>Para A Fazer</button>
                                <button onClick={() => moverPara("EM_ANDAMENTO")}>Para Em Andamento</button>
                                <button onClick={() => moverPara("CONCLUIDA")}>Para Concluída</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card_tarefa_coluna_conteudo">
                    <h2>{props.titulo}</h2>
                    <p>{props.descricao}</p>
                    <div>
                        <img src={IconeData} alt="Ícone calendário" />
                        <p>Data Limite: {props.data}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardTarefaColuna;
