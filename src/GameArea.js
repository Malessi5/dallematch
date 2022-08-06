import React from "react";
import {setState, useEffect} from "React";

function GameArea() {
  const {cards, setCards} = setState([])

  useEffect(function(){
    setCards([{id:1, image:''}])

  return <div id='game_area'></div>;
}

export default App;
