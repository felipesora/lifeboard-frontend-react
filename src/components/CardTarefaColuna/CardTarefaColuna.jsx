import "./CardTarefaColuna.css"
import IconeData from "../../assets/images/icone-tarefa-data-limite.png";
import IconeMenu from "../../assets/images/icone-menu-vertical.png";

const CardTarefaColuna = (props) => {

    return (
        <div className="card_tarefa_coluna">

            <div>
                <div className="card_tarefa_coluna_cabecalho">
                    <div style={{ backgroundColor: props.corFundo }} className="card_tarefa_coluna_cabecalho_prioridade">
                        <p style={{ color: props.corTexto }}>Prioridade {props.prioridade}</p>
                    </div>

                    <button>
                        <img src={IconeMenu} alt="Icone menu verfical"/>
                    </button>
                </div>

                <div className="card_tarefa_coluna_conteudo">
                    <h2>{props.titulo}</h2>
                    <p>{props.descricao}</p>
                    <div>
                        <img src={IconeData} alt="Icone calendário" />
                        <p>Data Limite: {props.data}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardTarefaColuna;
