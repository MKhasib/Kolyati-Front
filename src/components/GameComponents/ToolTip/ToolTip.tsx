import { IonIcon } from "@ionic/react";
import { informationCircle } from "ionicons/icons";
import React from "react";
import classes from "./ToolTip.module.css";
const ToolTip: React.FC = () => {
  return (
    <div className={classes.tooltip}>
    
      <span className={classes.tooltiptext}>
        <div>One Click - info</div>
        <div>Two Clicks - Pick</div>
      </span>
      <IonIcon
        src={informationCircle}
        color="primary"
        className={classes.icon}
      />
    </div>
  );
};
export default ToolTip;
