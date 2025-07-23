import './ModalTarefaDeletar.css';
import IconeFechar from '../../assets/images/icone-fechar.png';


const ModalTarefaDeletar = ({ aberto, onClose, onDelete }) => {

    if (!aberto) return null;

    return (
        <div className="modal_overlay_tarefa">
            <div className="modal_conteudo_tarefa">
                <div className='modal_conteudo_tarefa_cabecalho'>
                    <h2>Deletar Tarefa</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_tarefa_conteudo'>

                    <p>Tem certeza que deseja deletar esta tarefa? Esta ação não poderá ser desfeita.</p>
                    <div className="modal_tarefa_botoes">
                        <button className='modal_tarefa_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                        <button className='modal_tarefa_botao_deletar' type="button" onClick={onDelete}>Deletar</button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ModalTarefaDeletar;