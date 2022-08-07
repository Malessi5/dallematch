import React, {useState, useEffect} from "react";
import Card from "./Card.js";
import Control from "./Control.js";

const cardBack = "cardback.png";

const testCards = [
  {
    id: 1,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/125897.jpg",
  },
  {
    id: 2,
    image:
      "https://product-images.tcgplayer.com/fit-in/438x438/filters:quality(1)/219441.jpg",
  },
  {
    id: 3,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/250320.jpg",
  },
  {
    id: 4,
    image: "https://product-images.tcgplayer.com/fit-in/438x438/87395.jpg",
  },
];

function GameArea() {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tries, setTries] = useState(0);

  function dupeAndShuffle(startDeck) {
    const deck = [...startDeck];
    const startLen = deck.length;

    //duplicate each card and update the id
    for (let i = 0; i < startLen; i++) {
      let card = {...deck[i]};
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
    let updatedDeck = deck.map((card) => {
      return {...card, matched: false, flipped: false};
    });
    setCards(updatedDeck);
  }

  function flipUnmatched() {
    let cState = [...cards];

    for (let c of cState) {
      if (!c.matched) {
        c.flipped = false;
      }
    }
    setCards(cState);
  }

  function checkForMatch(select) {
    let [cidx1, cidx2] = select;

    console.log(cards[cidx1], cards[cidx2]);
    if (cards[cidx1].id === cards[cidx2].id) {
      const newState = [...cards];
      newState[cidx1].matched = true;
      newState[cidx2].matched = true;
      console.log("match");
      setCards(newState);
    } else {
      console.log("no match");
    }
  }

  function checkWin() {
    for (let card of cards) {
      if (!card.matched) {
        return false;
      }
    }
    console.log("You win!");
    return true;
  }

  useEffect(function () {
    if (cards.length === 0) {
      const deck = dupeAndShuffle(testCards);
      setCards(deck);
      initializeCardState(deck);
    }
  }, []);

  return (
    <div id='game_area' className='container'>
      <div className='row'>
        {cards.length > 0 &&
          cards.map((card, i) => {
            return (
              <Card
                image={card.image}
                key={i}
                back={cardBack}
                selected={selected}
                setSelected={setSelected}
                idx={i}
                cards={cards}
                setCards={setCards}
                flipUnmatched={flipUnmatched}
                checkMatch={checkForMatch}
                card={card}
                checkWin={checkWin}
                tries={tries}
                setTries={setTries}
              />
            );
          })}
      </div>
      <div className='row'>
        <Control
          cards={cards}
          setCards={setCards}
          tries={tries}
          setTries={setTries}
        />
      </div>
    </div>
  );
}

export default GameArea;
