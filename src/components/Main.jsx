import Die from "./Die";
import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Main() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const newGameButtonElem = useRef(null);

  let gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  
  gameWon && newGameButtonElem.current.focus();

  function generateAllNewDice() {
    return new Array(10).fill().map(() => ({
      value: Math.floor(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const diceArray = dice.map((diceObject) => (
    <Die
      key={diceObject.id}
      value={diceObject.value}
      isHeld={diceObject.isHeld}
      hold={hold}
      id={diceObject.id}
    />
  ));

  function handleClick() {
    setDice((prevDice) =>
      prevDice.map((diceObject) =>
        !diceObject.isHeld
          ? { ...diceObject, value: Math.floor(Math.random() * 6) }
          : diceObject
      )
    );

    gameWon && setDice(generateAllNewDice);
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((diceObject) =>
        diceObject.id === id
          ? { ...diceObject, isHeld: !diceObject.isHeld }
          : diceObject
      )
    );
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live="polite">{gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}</div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each dice to freeze it at its
        current value between rolls.
      </p>
      <div className="die-grid">{diceArray}</div>

      <button ref={newGameButtonElem} className="roll-dice-button" onClick={handleClick}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
