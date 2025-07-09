import "./cardPequeno.css"

const CardPequeno = (props) => {

    return (
       <div className="card_pequeno">
            <div>
                <img src={props.icone} alt={props.descricao} />
                <p>{props.titulo}</p>
            </div>
            <h3 style={{ color: props.cor }}>R$ {props.valor}</h3>
       </div> 
    )
}

export default CardPequeno;
