import './CardMeta.css'
import IconeMenuVertical from "../../assets/images/icone-menu-vertical.png"



const CardMeta = (props) => {

    return (
        <div className="card_meta">
            
            <div className="card_meta_cabecalho">
                <div>
                    <img src={props.iconeMeta} alt="Icone da Meta" />
                    <h3>{props.nomeMeta}</h3>
                </div>

                <button>
                    <img src={IconeMenuVertical} alt="Icone menu vertical" />
                </button>
            </div>

            <p>{props.valorMeta} | {props.valorAtingido}</p>

            {/* Barra de progresso */}

            <div className='card_meta_data_limite'>
                <p>Até: {props.dataLimite}</p>
            </div>
            
        </div>
    )
}

export default CardMeta;
