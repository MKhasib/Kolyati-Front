import React, { useEffect } from "react";
import classes from "./GameComponents.module.css";
import Player from "./Player/Player";
import { Howl, Howler } from "howler";
import ToolTip from "./ToolTip/ToolTip";
const GameComponents: React.FC = () => {
  useEffect(() => {
    var sound = new Howl({
      src: require("../../res/imposter.mp4"),
    });
    Howler.volume(1.0);
    sound.play();
  }, []);
  var bruh = new Howl({
    src: require("../../res/Bruh.mp3"),
  });
  const gameType = Math.random() > 0.5 ? "One Imposter" : "Two Imposters";
  let names = ["Majd", "Wasfi", "Shireen"];
  let indexes: number[] = [];
  let gameDescription =
    gameType === "One Imposter" ? "Find The Imposter" : "Find the victim";
  names.sort(() => Math.random() - 0.5);
  var map = new Map<string, string>();
  var profileMap = new Map<string, string>();
  profileMap.set(
    "Wasfi",
    "https://www.linkedin.com/in/wasfi-mahmoud-4b2b371b4/"
  );
  profileMap.set("Majd", "https://www.linkedin.com/in/mkhasib1/");
  profileMap.set(
    "Shireen",
    "https://www.linkedin.com/in/shireen-sehwail-a7bb69200/"
  );
  indexes.push(getRandomInt(3));
  map.set(names[indexes[0]], "Not Me");
  indexes.push(names[indexes[0]] === names[0] ? 1 : 0);

  indexes.push(indexes.includes(0) ? (indexes.includes(1) ? 2 : 1) : 0);

  map.set(names[indexes[1]], `I know It's ${names[indexes[0]]}`);
  map.set(names[indexes[2]], `I know It's ${names[indexes[1]]}`);

  function handleDoubleClick(name: string) {
    if (map.get(name) === map.get(names[indexes[1]])) {
      window.open(profileMap.get(name));
    } else {
      bruh.play();
    }
  }
  let colors = ["#770000", "#047700", "#004177"];

  colors.sort(() => Math.random() - 0.5);
  let playersContainer = names.map((name, index) => {
    return (
      <div className={classes.flexBasis} key={index}>
        <Player
          name={name}
          role={"" + map.get(name)}
          color={colors[index]}
          doubleClicked={handleDoubleClick}
        />
      </div>
    );
  });
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
    <div>
      <div className={classes.Title}>
        <div className={classes.Opacity}>
          <div className={classes.Imposter}>{gameType}</div>
        </div>
      </div>
      <div className={classes.Center}>{gameDescription}</div>
      <div className={classes.info}>
        <ToolTip />
      </div>

      <div className={classes.flex}>{playersContainer}</div>
    </div>
  );
};
export default GameComponents;
