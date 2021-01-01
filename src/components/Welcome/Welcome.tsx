import {   IonContent, IonPage, IonSlide, IonSlides } from "@ionic/react";
import React from "react";
import FirstSlide from "../Slides/FirstSlide/FirstSlide";


 const Welcome :React.FC=()=>{const slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  const style={
    height: "100%"
  }
  return( 
    <IonPage>
    <IonContent>
    <IonSlides pager={true} options={slideOpts} style={style} >
      <IonSlide >
        <FirstSlide/>
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
      </IonSlide>
    </IonSlides>
  </IonContent>
    </IonPage> 
          )}
export default Welcome;