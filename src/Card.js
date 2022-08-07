import React, {useState, useEffect} from "react";

export default function Card(props) {
  const {
    image,
    back,
    selected,
    setSelected,
    cards,
    setCards,
    idx,
    flipUnmatched,
    checkMatch,
    card,
    checkWin,
    tries,
    setTries,
  } = props;

  function clickHandle() {
    if (!card.matched && !card.flipped) {
      let select = selected;

      if (select.length === 2) {
        flipUnmatched();
        select = [];
      }

      if (select.length === 1) {
        select.push(idx);
        setTries(tries + 1);
        checkMatch(select);
      } else {
        select.push(idx);
      }

      setSelected(select);
      flipCard();
      checkWin();
    }
  }

  function flipCard() {
    let updateCards = [...cards];
    updateCards[idx].flipped = !updateCards[idx].flipped;
    setCards(updateCards);
  }

  return (
    <div className='card' style={{width: "10em"}} onClick={clickHandle}>
      {" "}
      {card.flipped ? <img src={image} /> : <img src={back} />}
    </div>
  );
}
