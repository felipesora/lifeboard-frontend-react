import './ModalDeletarMeta.css';
import IconeFechar from '../../assets/images/icone-fechar.png';


const ModalDeletarMeta = ({ aberto, onClose, onDelete }) => {

    if (!aberto) return null;

    return (
        <div className="modal_overlay_meta">
            <div className="modal_conteudo_meta">
                <div className='modal_conteudo_meta_cabecalho'>
                    <h2>Deletar Meta</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_meta_conteudo'>

                    <p>Tem certeza que deseja deletar esta meta financeira? Esta ação não poderá ser desfeita.</p>
                    <div className="modal_meta_botoes">
                        <button className='modal_meta_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_meta_botao_deletar' type="button" onClick={onDelete}>Deletar</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ModalDeletarMeta;