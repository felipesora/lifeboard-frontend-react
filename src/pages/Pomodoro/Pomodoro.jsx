import "./Pomodoro.css";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { useEffect, useRef, useState } from "react";
import MenuLateral from "../../components/MenuLateral";
import IconePomodoro from "../../assets/images/icone-relogio-pomodoro.png";
import IconePlay from "../../assets/images/icone-play.png";
import IconePausa from "../../assets/images/icone-pausa.png";
import IconeResetar from "../../assets/images/icone-resetar.png";
import IconeSeta from "../../assets/images/icone-seta-baixo.png";
import SomAlarme from "../../assets/sounds/alerme1.wav";
import Cabecalho from "../../components/Cabecalho";

const Pomodoro = () => {
    useAuthRedirect();

    const [tempo, setTempo] = useState(1500); // 25:00 em segundos
    const [tempoSelecionadoAtual, setTempoSelecionadoAtual] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const audioRef = useRef(null);

    // Atualiza o tempo a cada segundo
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTempo((prevTempo) => {
                    if (prevTempo <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        if (audioRef.current) {
                            audioRef.current.play();
                        }
                        return 0;
                    }
                    return prevTempo - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const formatarTempo = (segundos) => {
        const min = String(Math.floor(segundos / 60)).padStart(2, "0");
        const sec = String(segundos % 60).padStart(2, "0");
        return `${min}:${sec}`;
    }

    const iniciar = () => setIsRunning(true);
    const pausar = () => setIsRunning(false);
    const resetar = () => {
        setIsRunning(false);
        setTempo(tempoSelecionadoAtual);
    };

    const mudarTempo = (segundos) => {
        setTempo(segundos);
        setTempoSelecionadoAtual(segundos);
        pausar();
    }

    return (
        <div className="dashboard_container">
            <Cabecalho />
            <MenuLateral />
            <div className="dashboard_main_pomodoro">
                <p>Pomodoro</p>

                <div className='container_pomodoro'>

                    <div className="container_pomodoro_caixa">
                        <img src={IconePomodoro} alt="Icone de relógio" className="icone_relogio_pomodoro"/>

                        <h1 className={tempo === 0 ? "tempo_zerado" : ""}>{formatarTempo(tempo)}</h1>

                        <div className="pomodoro_botoes_controle">
                            {!isRunning ? (
                                <button onClick={iniciar}>
                                    <img src={IconePlay} alt="Icone de play"/>
                                </button>
                            ) : (
                                <button onClick={pausar}>
                                    <img src={IconePausa} alt="Icone de pausa"/>
                                </button>
                                
                            )}
                            
                            <button onClick={resetar}>
                                <img src={IconeResetar} alt="Icone de resetar"/>
                            </button>
                        </div>

                        <div className="pomodoro_botoes_tempo">
                            <button onClick={() => mudarTempo(1500)}>
                                25:00
                            </button>

                            <button onClick={() => mudarTempo(300)}>
                                5:00
                            </button>

                            <button onClick={() => mudarTempo(900)}>
                                15:00
                            </button>
                        </div>
                    </div>

                    <audio src={SomAlarme} ref={audioRef} preload="auto"></audio>

                    <div className="container_pomodoro_pergunta">
                        <details>

                            <summary>
                                <span>Como funciona o método Pomodoro?</span>
                                <img src={IconeSeta} alt="Icone de uma seta para baixo"/>
                            </summary>

                            <div class="container_pomodoro_pergunta_resposta">
                                <p>O método Pomodoro ajuda você a manter o foco, dividindo o trabalho em blocos de tempo.</p>
                                <ul>
                                    <li>25:00 – Pomodoro: Trabalhe concentrado em uma tarefa.</li>
                                    <li>5:00 – Pausa curta: Levante, respire, tome água.</li>
                                    <li>15:00 – Pausa longa: Descanse de verdade, recarregue a mente.</li>
                                </ul>
                            </div>

                        </details>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Pomodoro;