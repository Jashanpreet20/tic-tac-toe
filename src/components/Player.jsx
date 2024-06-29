import { useState } from "react";

export default function Player({intianlName,symbol,isActive,onchangename}) {
  const [playerName,setPlayerName]=useState(intianlName);

  function nameHander(event){
      setPlayerName(event.target.value);
  }
  const [isEditing, setEditing] = useState(false);

  function changeHandler() {
    //setEditing(true);
   // setEditing(!isEditing);
   // fast hoti hai miliseconds ke accorrding
    setEditing((editing) => !editing);

    if(isEditing){
      onchangename(symbol,playerName);
    }
  }

  let EditablePlayerName=<span className="player-name">{playerName}</span>
  if (isEditing) {
      EditablePlayerName=<input type="text" required value={playerName} onChange={nameHander}/>
  }
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {EditablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={changeHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
