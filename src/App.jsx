import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./components/Game-over";

const intialgameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivingactiveplayer(gameturns) {
  let currentplayer = "X";
  if (gameturns.length > 0 && gameturns[0].player === "X") {
    currentplayer = "O";
  }

  return currentplayer;
}

function derivingwinnder(gameboard,players){
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSqaureSymbol =
      gameboard[combinations[0].row][combinations[0].column];
    const secondSqaureSymbol =
      gameboard[combinations[1].row][combinations[1].column];
    const thirdSqaureSymbol =
      gameboard[combinations[2].row][combinations[2].column];

    if (
      firstSqaureSymbol &&
      firstSqaureSymbol === secondSqaureSymbol &&
      firstSqaureSymbol === thirdSqaureSymbol
    ) {
      winner=players[firstSqaureSymbol];
    }
  }
  return winner;
}

function derivinggameboard(gameturns){
  let gameboard = [...intialgameboard.map(array => [...array])];

  for (const turn of gameturns) {
    const { sqaure, player } = turn;
    const { row, col } = sqaure;
    gameboard[row][col] = player;
  }
  return gameboard;
}
function App() {
  //  const [activeplayer, setactiveplayer] = useState("X");
  const[players,setplayers] =useState(
    {
      'X': 'Player 1',
      'O': 'Player 2'
    }
  )
  const [gameturns, setGameTurns] = useState([]);

  const activeplayer = derivingactiveplayer(gameturns);

  const gameboard=derivinggameboard(gameturns);
  const winner=derivingwinnder(gameboard,players)
   const hasdraw=gameturns.length === 9 && !winner;

   function gameRestart(){
    setGameTurns([]);
   }

   function playernamechangehandler(symbol,name){
    return setplayers(prevname=>{
     return {
      ...prevname,
      [symbol]:name
     }
    })
   }
  function handleActiveSqaure(rowIndex, colIndex) {
    // setactiveplayer((active) => (active === "X" ? "O" : "X"));

    setGameTurns((prevturns) => {
      const currentplayer = derivingactiveplayer(prevturns);

      const updatedTurns = [
        { sqaure: { row: rowIndex, col: colIndex }, player: currentplayer },
        ...prevturns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intianlName="Player 1"
            symbol="X"
            isActive={activeplayer === "X"}
            onchangename={playernamechangehandler}
          />
          <Player
            intianlName="Player 2"
            symbol="O"
            isActive={activeplayer === "O"}
            onchangename={playernamechangehandler}
          />
        </ol>
        {(winner || hasdraw) && <Gameover winner={winner} onRestart={gameRestart}/>}
        <GameBoard onSelectSqaure={handleActiveSqaure} board={gameboard} />
      </div>
      <Log turns={gameturns} />
    </main>
  );
}

export default App;
