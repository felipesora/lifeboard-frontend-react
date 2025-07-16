import './CardMeta.css'
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const CardMeta = (props) => {
    const navigate = useNavigate();
    const [menuAberto, setMenuAberto] = useState(false);
    const menuRef = useRef(null);

    const progresso = Math.min(
        (props.valorAtualNum / props.valorMetaNum) * 100,
        100
    );

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

    const handleEditar = () => {
        navigate(`/editar-meta/${props.idMeta}`);
        setMenuAberto(false);
    };

    return (
        <div className="card_meta">
            
            <div className="card_meta_cabecalho">
                <div>
                    <img src={props.iconeMeta} alt="Icone da Meta" />
                    <h3>{props.nomeMeta}</h3>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button className='botao_menu_vertical_card_meta' onClick={() => setMenuAberto(!menuAberto)}>
                        <img src={IconeMenuVertical} alt="Icone menu vertical" />
                    </button>

                    {menuAberto && (
                        <div ref={menuRef} className="menu_meta_dropdown">
                            <button onClick={() => {
                                props.onAdicionarSaldo(props.idMeta);
                                setMenuAberto(false);
                            }}>
                                Adicionar Saldo
                            </button>

                            <button onClick={handleEditar}>Editar</button>

                            <button onClick={() => {
                                props.onDeletar(props.idMeta);
                                setMenuAberto(false);
                            }}>
                                Deletar
                            </button>

                        </div>
                    )}
                </div>
            </div>

            <p>{props.valorAtual} | {props.valorMeta}</p>

            {/* Barra de progresso */}
            <div className='barra_progresso_container'>
                <div className="barra_prograsso">
                    <div
                        className='progresso_fill'
                        style={{ width: `${progresso}%` }}
                    ></div>
                </div>
                <span>{progresso.toFixed(0)}%</span>
            </div>

            <div className='card_meta_data_limite'>
                <p>Até: {props.dataLimite}</p>
            </div>
            
        </div>
    )
}

export default CardMeta;
