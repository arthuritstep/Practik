
import { useState } from "react";
import "./styles.css";

function App() {
  const [energy, setEnergy] = useState(3);
  const [hasKey, setHasKey] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [escaped, setEscaped] = useState(false);

  const startGame = () => {
    setEnergy(3);
    setHasKey(false);
    setGameStarted(true);
    setGameOver(false);
    setEscaped(false);
  };

  const searchKey = () => {
    if (energy <= 0 || hasKey || gameOver) {
      return;
    }

    setEnergy(energy - 1);
    setHasKey(true);

    if (energy - 1 === 0) {
      setGameOver(true);
    }
  };

  const openDoor = () => {
    if (hasKey && energy > 0 && !gameOver) {
      setEscaped(true);
      setGameOver(true);
    }
  };

  const rest = () => {
    if (gameOver) {
      return;
    }

    setEnergy(energy + 1);
  };

  return (
    <div className="card">
      <h1>побег из комнаты</h1>

      {!gameStarted ? (
        <>
          <p>ты заперт в комнате. Найди ключ и выберись</p>
          <button className="button" onClick={startGame}>
            начать игру
          </button>
        </>
      ) : (
        <>
          <h2>энергия: {energy}</h2>

          <p>
            ключ: {hasKey ? "Есть" : "Нет"}
          </p>

          {!gameOver && (
            <div className="section">
              <button
                className="button"
                onClick={searchKey}
                disabled={hasKey || energy === 0}
              >
                искать ключ
              </button>

              <button
                className="button"
                onClick={openDoor}
                disabled={!hasKey}
              >
                открыть дверь
              </button>

              <button
                className="button"
                onClick={rest}
              >
                отдохнуть
              </button>
            </div>
          )}

          {hasKey && (
            <h3 className="success">вы нашли ключ</h3>
          )}

          {gameOver && (
            <div className="confirm">
              {escaped ? (
                <h2>вы сбежали</h2>
              ) : (
                <h2>вы проиграли</h2>
              )}

              <button
                className="button"
                onClick={startGame}
              >
                Начать заново
              </button>
            </div>
          )}

          {!gameOver && energy === 0 && (
            <p>у тебя закончилась энергия</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;