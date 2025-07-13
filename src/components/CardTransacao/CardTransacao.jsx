import "./CardTrasacao.css";

const CardTrasacao = (props) => {

    return (
        <div className="card_transacao" style={{ backgroundColor: props.corFundo }}>
            <h1 style={{ color: props.corTexto }}>{props.titulo}</h1>
            <h2 style={{ color: props.corTexto }}>R$ {props.valor}</h2>
            <p>{props.descricao} - {props.data}</p>
        </div>
    )
}

export default CardTrasacao;