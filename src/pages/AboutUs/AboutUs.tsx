import { IonHeader, IonToolbar, IonTitle, IonButton, IonMenuButton, IonContent } from "@ionic/react";
import { title } from "process";
import React from "react";

const AboutUs: React.FC = () => {
  
 
    return(
        <>
        <IonHeader dir="rtl">
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
          <IonContent fullscreen color="light">
         
         
      

          </IonContent>
          </>
        );

}
export default AboutUs;
 