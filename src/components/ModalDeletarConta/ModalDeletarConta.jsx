    import './ModalDeletarConta.css';
    import IconeFechar from '../../assets/images/icone-fechar.png';


    const ModalDeletarConta = ({ aberto, onClose, onDelete, confirmarExclusao, setConfirmarExclusao }) => {

        if (!aberto) return null;

        return (
            <div className="modal_overlay_deletar_conta">
                <div className="modal_conteudo_deletar_conta">
                    <div className='modal_conteudo_deletar_conta_cabecalho'>
                        <h2>Excluir Conta</h2>
                        <button onClick={onClose}>
                            <img src={IconeFechar} alt="Icone de x" />
                        </button>
                    </div>

                    <hr />

                    <div className='modal_conteudo_deletar_conta_conteudo'>
                        <div className='modal_deletar_conta_texto'>
                            <p>Tem certeza que deseja excluir sua conta? Esta ação é irreversível.</p>
                            <p>Para confirmar, digite “excluir conta” no campo a baixo:</p>
                        </div>

                        <div className='modal_deletar_conta_input'>
                            <input 
                            type="text" 
                            value={confirmarExclusao}
                            onChange={(e) => setConfirmarExclusao(e.target.value)}
                            />
                        </div>
                        
                        <div className="modal_deletar_conta_botoes">
                            <button className='modal_deletar_conta_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                            <button 
                            className='modal_deletar_conta_botao_deletar' 
                            type="button" 
                            onClick={onDelete}
                            disabled={confirmarExclusao != "excluir conta"}
                            >
                                Deletar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    export default ModalDeletarConta;