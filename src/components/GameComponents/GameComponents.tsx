import React from "react";
import Red from "./Red/Red";
import classes from "./GameComponents.module.css";
import Green from "./Green/Green";
import Blue from "./Blue/Blue";
const GameComponents: React.FC = () => {
  let names=["Majd","Wasfi","Shireen"];
  shuffle(names);
  function shuffle(array:string[]) {
    array.sort(() => Math.random() - 0.5);
  }
  return (
    <div>
      <div className={classes.Title}>
        <div className={classes.Imposter}> Two Imposters</div>
      </div>
      <div className={classes.flex}>
        <div className={classes.flexBasis}>
          <Red name={names[0]}/>
        </div>
        <div className={classes.flexBasis}>
          <Green name={names[1]}/>
        </div>
        <div className={classes.flexBasis}>
          <Blue name={names[2]}/>
        </div>
      </div>
    </div>
  );
};
export default GameComponents;
