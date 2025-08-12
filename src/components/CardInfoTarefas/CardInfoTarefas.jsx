import "./CardInfoTarefas.css"



const CardInfoTarefas = (props) => {

    return (
        <div className="card_tarefa">
            
            <div>
                <div className="card_tarefa_cabecalho">
                    <img src={props.icone} alt="Icone do card" />
                    <h2>{props.titulo}</h2>
                </div>

                <div className="card_tarefa_conteudo">
                    <p style={{ color: props.cor }} className="card_tarefa_conteudo_descricao">{props.descricao}</p>
                    <p style={{ color: props.cor }} className="card_tarefa_conteudo_quantidade">{props.quantidade}</p>
                </div>
            </div>

        </div>
    )
}

export default CardInfoTarefas;
