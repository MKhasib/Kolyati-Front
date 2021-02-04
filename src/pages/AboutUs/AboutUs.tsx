import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonContent,
} from "@ionic/react";
import React from "react";
import GameComponents from "../../components/GameComponents/GameComponents";

const AboutUs: React.FC = () => {
  const title = "من نحن";

  return (
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
        <GameComponents />
      </IonContent>
    </>
  );
};
export default AboutUs;
