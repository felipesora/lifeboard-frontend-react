import './ModalDefinirSalario.css';
import IconeFechar from '../../assets/images/icone-fechar.png';


const ModalDefinirSalario = ({ aberto, onClose, onSalvar }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const valor = e.target.salario.value;
        onSalvar(valor);
        onClose();
    };

    if (!aberto) return null;

    return (
        <div className="modal_overlay_salario">
            <div className="modal_conteudo_salario">
                <div className='modal_conteudo_salario_cabecalho'>
                    <h2>Definir Salário</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />

                <div className='modal_conteudo_salario_conteudo'>

                    <p>Digite o valor do seu salário.</p>

                    <form onSubmit={handleSubmit} className='modal_form_salario'>
                        <input
                            type="number"
                            step="any"
                            name="salario"
                            placeholder="Digite o novo salário"
                            required
                        />
                        <div className="modal_botoes_salario">
                            <button className='modal_salario_botao_cancelar' type="button" onClick={onClose}>Cancelar</button>
                            <button className='modal_salario_botao_adicionar' type="submit">Salvar</button>
                        </div>
                    </form>
                    
                </div>
            
            </div>
        </div>
    );
}

export default ModalDefinirSalario