import "./CardTrasacao.css";

const CardTrasacao = (props) => {

    return (
        <div className="card_transacao" style={{ backgroundColor: props.corFundo }}>
            <h1 style={{ color: props.corTexto }}>{props.titulo} - {props.data}</h1>
            <h2 style={{ color: props.corTexto }}>{props.valor}</h2>
            <p>{props.descricao}</p>
        </div>
    )
}

export default CardTrasacao;