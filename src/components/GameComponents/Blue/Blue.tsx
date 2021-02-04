import { IonImg } from "@ionic/react";
import React from "react";
import classes from './Blue.module.css';

const Blue: React.FC <{name:string}> = ({name}) => {
  

    return(
      <div className={classes.Blue}>
      <div className={classes.Name}>
          {name}
      </div>
      <IonImg src={require("../../../res/Blue.svg")}/>
      </div>       
        );

}
export default Blue;
 