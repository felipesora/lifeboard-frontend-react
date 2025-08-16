import './CardDemonstracaoPagina.css';

const CardDemonstracaoPagina = (props) => {
    return (
        <div className='card_demonstracao_pagina'>

            <div className='card_demonstracao_pagina_imagem'>
                <img src={props.imagem} alt={props.descricao} />
            </div>

            <div className='card_demonstracao_pagina_texto'>
                <p>{props.texto}</p>
            </div>
        </div>
    )
}

export default CardDemonstracaoPagina;