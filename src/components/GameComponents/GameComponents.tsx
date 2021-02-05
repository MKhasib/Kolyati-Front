import React from "react";
import Red from "./Red/Red";
import classes from "./GameComponents.module.css";
import Green from "./Green/Green";
import Blue from "./Blue/Blue";
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
    map.set("Not Me", names[indexes[0]]);
    indexes.push(names[indexes[0]] === names[0] ? 1 : 0);
    console.log(indexes);

    indexes.push(indexes.includes(0) ? (indexes.includes(1) ? 2 : 1) : 0);

    map.set("Imposter", names[indexes[1]]);
    map.set(`I know It's ${names[indexes[1]]}`, names[indexes[2]]);
  }

  function handleDoubleClick(name:string) {
    if(name===map.get("Imposter"))
    {
      window.open("https://www.linkedin.com/in/mkhasib1/")
    }
  }
  let players = [
    <div className={classes.flexBasis} key={1}>
      <Red
        role={"It's Not me"}
        name={"" + map.get("Not Me")}
        doubleClicked={handleDoubleClick}
      />
    </div>,
    <div className={classes.flexBasis} key={2}>
      <Green
        role={`I know It's ${names[indexes[0]]}`}
        name={"" + map.get("Imposter")}
        doubleClicked={handleDoubleClick}
      />
    </div>,
    <div className={classes.flexBasis} key={3}>
      <Blue
        role={`I know It's ${names[indexes[1]]}`}
        name={"" + map.get(`I know It's ${names[indexes[1]]}`)}
        doubleClicked={handleDoubleClick}
      />
    </div>,
  ];
  players.sort(() => Math.random() - 0.5);
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  return (
    <div>
      <div className={classes.Title}>
        <div className={classes.Imposter}>{gameType}</div>
      </div>
      <div className={classes.Center}>Find The Imposter</div>
      <div className={classes.flex}>{players.map((player) => player)}</div>
    </div>
  );
};
export default GameComponents;
