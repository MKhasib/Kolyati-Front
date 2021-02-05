import { IonImg, IonToast } from "@ionic/react";
import React, { useState } from "react";
import classes from "./Green.module.css";

const Green: React.FC<{
  name: string;
  role: string;
  doubleClicked: (e: any) => void;
}> = ({ name, role, doubleClicked }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div
      className={classes.Green}
      onClick={(e) => {
        setTimeout(() => setShowToast(true), 200);
      }}
      onDoubleClick={(e) => {
        setShowToast(false);

        doubleClicked(name);
      }}
    >
      <div className={classes.Name}>{name}</div>
      <IonImg src={require("../../../res/Green.svg")} />
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
export default Green;
