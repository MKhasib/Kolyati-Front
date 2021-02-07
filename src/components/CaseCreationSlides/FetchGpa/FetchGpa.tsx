import { IonButton, IonCol, IonGrid, IonInput, IonItem, IonLabel, IonRow } from "@ionic/react";
import React, { useRef } from "react";
import classes from './FetchGpa.module.css';
 const FetchGpa :React.FC<{gpa:string,setGpa:(gpa:string)=>void}>=({gpa,setGpa})=>
{const style={marginRight:"20px",color:"#636363"};
const inputRef=useRef<HTMLIonInputElement>(null);
const handleGpa=()=>{
  if(inputRef.current?.value==="")
 { handleNotGpa();
  return;
 }
  setGpa(""+inputRef.current?.value);
}
const handleNotGpa=()=>{
  setGpa("100");
}

return (<>
<h3 style={style}> ضع معدل التوجيهي المتوقع</h3>
<IonGrid >

<IonRow >
  <IonCol className={classes.Col}>
  <IonItem  className={classes.Large}>
<IonLabel color="primary"  position="floating" >المعدل المتوقع</IonLabel>
<IonInput color="primary"  
type="number" 
min="50" 
max="100" 
value={gpa}
ref={inputRef}
></IonInput>
</IonItem>
</IonCol>
</IonRow>
<IonRow>
<IonCol className={classes.Col}>
          <IonButton color="success" onClick={handleGpa}>
          إستمر بالمعدل
          </IonButton>
        </IonCol>
        <IonCol className={classes.Col}>
        <IonButton color="danger" onClick={handleNotGpa}>
          إستمر بدون المعدل
        </IonButton>
        </IonCol>
        </IonRow>
      </IonGrid >

</>)
        }

export default FetchGpa;