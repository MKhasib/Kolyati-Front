import { IonImg } from "@ionic/react";
import React from "react";
import classes from './Green.module.css';

const Green: React.FC<{name:string,role:string}> = ({name,role}) => {
  

    return(
      <div className={classes.Green}>
      <div className={classes.Name}>
          {name}
      </div>
      <IonImg src={require("../../../res/Green.svg")}/>
      </div>    
        );

}
export default Green;
 