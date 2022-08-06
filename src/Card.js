import React, {useState, useEffect} from "react";

export default function Card(props) {
  const {
    image,
    name,
    id,
    back,
    selected,
    setSelected,
    deckSize,
    cardState,
    setCardState,
    idx,
    flipUnmatched,
  } = props;

  // const [flipped, setFlip] = useState(false);
  // const [matched, setMatched] = useState(false);

  function clickHandle() {
    if (!cardState[idx].matched) {
      flipCard(idx, cardState);
      console.log("selected", selected);
      if (selected) {
        let matchedId = Math.abs(id - deckSize);

        if (selected === matchedId) {
          const newState = [...cardState];
          newState[idx].matched = true;
          newState[selected].matched = true;
          setCardState(newState);
          setSelected(0);
          console.log("matched");
        } else {
          setSelected(0);
        }
      } else {
        flipUnmatched(cardState, idx);
        setSelected(idx);
      }
    }
  }

  function flipCard(cardInd, cState) {
    const newState = [...cState];
    newState[cardInd].flipped = !newState[cardInd].flipped;
    setCardState(newState);
  }

  return (
    <div className='card' style={{width: "10em"}} onClick={clickHandle}>
      {" "}
      {cardState[idx].flipped ? <img src={image} /> : <img src={back} />}
    </div>
  );
}
