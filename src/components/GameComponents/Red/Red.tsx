import { IonImg, IonToast } from "@ionic/react";
import React, { useState } from "react";
import classes from "./Red.module.css";
const Red: React.FC<{
  name: string;
  role: string;
  doubleClicked: (e: any) => void;
}> = ({ name, role, doubleClicked }) => {
  const [showToast, setShowToast] = useState(false);
  return (
    <div
      className={classes.Red}
      onClick={(e) => {
        setTimeout(() => setShowToast(true), 500);
      }}
      onDoubleClick={(e) => {
        doubleClicked(name);
      }}
    >
      <div className={classes.Name}>{name}</div>
      <IonImg src={require("../../../res/Red.svg")} />
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
export default Red;
