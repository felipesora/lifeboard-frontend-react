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
        <div className="modal_overlay">
            <div className="modal_conteudo">
                <div>
                    <h2>Definir Salário</h2>
                    <button onClick={onClose}>
                        <img src={IconeFechar} alt="Icone de x" />
                    </button>
                </div>

                <hr />
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        step="any"
                        name="salario"
                        placeholder="Digite o novo salário"
                        required
                    />
                    <div className="modal_botoes">
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalDefinirSalario