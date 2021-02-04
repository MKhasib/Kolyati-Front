import { IonImg } from "@ionic/react";
import React from "react";
import classes from './Red.module.css';
const Red: React.FC<{name:string}> = ({name}) => {
  

    return(
<div className={classes.Red}>
<div className={classes.Name}>
    {name}
</div>
<IonImg src={require("../../../res/Red.svg")}/>
</div>        
        );

}
export default Red;
 