import React from "react";
import classes from "./GameComponents.module.css";
import Player from "./Player/Player";
const GameComponents: React.FC = () => {
  //const gameType = Math.random() > 0.5 ? "One Imposter" : "Two Imposters";
  const gameType = "One Imposter";
  let names = ["Majd", "Wasfi", "Shireen"];
  let indexes = [];
  names.sort(() => Math.random() - 0.5);
  var map = new Map<string, string>();
  var profileMap = new Map<string, string>();
  profileMap.set("Wasfi","https://www.linkedin.com/in/wasfi-mahmoud-4b2b371b4/");
  profileMap.set("Majd","https://www.linkedin.com/in/mkhasib1/");
  profileMap.set("Shireen","https://www.linkedin.com/in/shireen-sehwail-a7bb69200/");
  if (gameType === "One Imposter") {
    indexes.push(getRandomInt(3));
    console.log(indexes);
    map.set(names[indexes[0]],"Not Me" );
    indexes.push(names[indexes[0]] === names[0] ? 1 : 0);
    console.log(indexes);

    indexes.push(indexes.includes(0) ? (indexes.includes(1) ? 2 : 1) : 0);

    map.set(names[indexes[1]],"Imposter");
    map.set(names[indexes[2]],`I know It's ${names[indexes[1]]}`);
  }

  function handleDoubleClick(name:string) {
    if(name===map.get("Imposter"))
    {
      window.open("https://www.linkedin.com/in/mkhasib1/")
    }
  }
  let colors=["#770000","#047700","#004177"];

  colors.sort(() => Math.random() - 0.5);
  let playersContainer=names.map((name,index)=>{
    return (<div className={classes.flexBasis} key={index}>
      <Player
      name={name}
      role={""+map.get(name)}
      color={colors[index]}
      doubleClicked={handleDoubleClick}

      />
    </div>)
  });
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  return (
    <div>
      <div className={classes.Title}>
        <div className={classes.Imposter}>{gameType}</div>
      </div>
      <div className={classes.Center}>Find The Imposter</div>
      <div className={classes.flex}>{playersContainer}</div>
    </div>
  );
};
export default GameComponents;
