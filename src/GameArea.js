import React, {useState, useEffect} from "react";
import Card from "./Card.js";

const cardBack = "cardback.png";

const testCards = [
  {
    id: 1,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/125897.jpg",
    name: "test-pika",
  },
  {
    id: 2,
    image:
      "https://product-images.tcgplayer.com/fit-in/438x438/filters:quality(1)/219441.jpg",
    name: "test-jiggly",
  },
  {
    id: 3,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/250320.jpg",
    name: "test-char",
  },
  {
    id: 4,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/87395.jpg",
    name: "test-3-mew",
  },
];

function GameArea() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState(0);
  const [cardState, setCardState] = useState([]);

  function dupeAndShuffle(startDeck) {
    const deck = [...startDeck];
    const startLen = deck.length;

    //duplicate each card and update the id
    for (let i = 0; i < startLen; i++) {
      let card = {...deck[i]};
      card.id = card.id + startLen;
      deck.push(card);
    }

    let count = deck.length;

    //shuffle the deck
    while (count) {
      deck.push(deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
    }

    return deck;
  }

  function initializeCardState(deck) {
    let newCardState = new Array(deck.length).fill(null);
    newCardState = newCardState.map(() => {
      let obj = {matched: false, flipped: false};
      return obj;
    });
    console.log(newCardState);
    setCardState(newCardState);
  }

  function flipUnmatched(currState, c1, c2 = 0) {
    let cState = [...currState];

    cState.forEach((c, i) => {
      console.log(i, c1, c2);
      if (!c.matched && i !== c1 && i !== c2) {
        c.flipped = false;
      }
    });

    // for (let c of cState) {
    //   if (!c.matched) {
    //     c.flipped = false;
    //   }
    // }
    setCardState(cState);
  }

  useEffect(function () {
    if (cards.length === 0) {
      const deck = dupeAndShuffle(testCards);
      setCards(deck);
      initializeCardState(deck);
    }
  }, []);

  return (
    <div id='game_area' className='container row'>
      {cards.length > 0 &&
        cards.map((card, i) => {
          return (
            <Card
              image={card.image}
              key={card.id}
              name={card.name}
              id={card.id}
              back={cardBack}
              selected={selected}
              setSelected={setSelected}
              deckSize={cards.length}
              idx={i}
              cardState={cardState}
              setCardState={setCardState}
              flipUnmatched={flipUnmatched}
            />
          );
        })}
    </div>
  );
}

export default GameArea;
