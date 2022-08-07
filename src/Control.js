import React, {useState, useEffect} from "react";

export default function Control(props) {
  const {cards, setCards, tries, setTries} = props;
  function resetCards() {
    let freshCards = [...cards];

    for (let card of freshCards) {
      card.matched = false;
      card.flipped = false;
    }
    setTries(0);
    setCards(freshCards);
  }
  return (
    <div>
      <button onClick={resetCards}>Reset</button>
      <p>Tries: {tries}</p>
    </div>
  );
}
