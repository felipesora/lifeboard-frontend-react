import './CardFuncionalidade.css';

const CardFuncionalidade = (props) => {
    return (
        <div className='card_funcionalidade'>
            <div className="card_funcionalidade_img">
                <img src={props.imagem} alt={props.altImagem} />
            </div>

            <div>
                <h4>{props.titulo}</h4>
                <p>{props.texto}</p>
            </div>
        </div>
    )
}

export default CardFuncionalidade;