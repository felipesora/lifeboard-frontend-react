import './ModalDeletarTransacao.css';
import IconeFechar from '../../assets/images/icone-fechar.png';


const ModalDeletarTransacao = ({ aberto, onClose, onDelete }) => {

    if (!aberto) return null;

    return (
        <div className="modal_overlay_deletar_transacao">
            <div className="modal_conteudo_deletar_transacao">
                <div className='modal_conteudo_deletar_transacao_cabecalho'>
                    <h2>Deletar Transação</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_deletar_transacao_conteudo'>
                    <p>Tem certeza que deseja deletar a transação? Esta ação é irreversível.</p>
                    <div className="modal_deletar_transacao_botoes">
                        <button className='modal_deletar_transacao_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_deletar_transacao_botao_deletar' type="button" onClick={onDelete}>Deletar</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalDeletarTransacao;