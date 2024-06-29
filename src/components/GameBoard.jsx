
export default function GameBoard({ onSelectSqaure, board }) {
 
  //  const [gameboard,setgameboard]=useState(intialgameboard);

  // function gameHandler(rowIndex,colIndex){
  //     setgameboard((prevgame) =>{
  //         const updategameboard=[...prevgame.map((innerarray) => [...innerarray])];
  //         updategameboard[rowIndex][colIndex]= activePlayerSymbol;
  //         return updategameboard;
  //     })
  //     onSelectSqaure();
  // }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectSqaure(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
