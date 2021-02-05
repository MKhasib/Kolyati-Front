import { IonImg, IonToast } from "@ionic/react";
import React, { useState } from "react";
import classes from "./Player.module.css";
const Player: React.FC<{
  name: string;
  role: string;
  color: string;
  doubleClicked: (e: any) => void;
}> = ({ name, role, color, doubleClicked }) => {
  const [showToast, setShowToast] = useState(false);
  const colorStyle = { color: color };
  const borderStyle = { borderColor: `${color} ` };
  return (
    <div
      className={classes.Player}
      style={borderStyle}
      onClick={(e) => {
        setTimeout(() => setShowToast(true), 500);
      }}
      onDoubleClick={(e) => {
        doubleClicked(name);
      }}
    >
      <div className={classes.Name} style={colorStyle}>
        {name}
      </div>
      <IonImg src={color==="#770000"?require("../../../res/Red.svg"):color=== "#047700"?require("../../../res/Green.svg"):require("../../../res/Blue.svg")} />
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={role}
        cssClass={classes.centerText}
        color="primary"
        duration={400}
      />
    </div>
  );
};
export default Player;
