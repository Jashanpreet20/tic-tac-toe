export default function Gameover({winner,onRestart}) {
  return (
    <div id="game-over">
      <h2>Game-over!</h2>
      {winner && <p>{winner} won!</p>}    
      {!winner && <p>It's draw</p>} 
      <p>
        <button onClick={onRestart}>Rematch!</button>
      </p>
    </div>
  );
}
