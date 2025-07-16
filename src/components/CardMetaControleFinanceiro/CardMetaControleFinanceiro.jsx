import './CardMetaControleFinanceiro.css'



const CardMetaControleFinanceiro = (props) => {

    const progresso = Math.min(
        (props.valorAtualNum / props.valorMetaNum) * 100,
        100
    );

    return (
        <div className="card_meta">
            
            <div className="card_meta_cabecalho">
                <div>
                    <img src={props.iconeMeta} alt="Icone da Meta" />
                    <h3>{props.nomeMeta}</h3>
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

export default CardMetaControleFinanceiro;
