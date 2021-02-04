import classes from "./PrefrenceSelection.module.css";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from "@ionic/react";
import {
  briefcase,
  carSport,
  cashOutline,
  personOutline,
  schoolOutline,
} from "ionicons/icons";
import React, { useState } from "react";

const PrefrenceSelection: React.FC<{ name: string }> = ({ name }) => {
  let icon = cashOutline;

  let cardStyle;
  switch (name) {
    case "كفائة الطاقم التدريسي":
      icon = personOutline;
      cardStyle = classes.First;
      break;
    case "المواصلات":
      icon = carSport;
      cardStyle = classes.Second;
      break;
    case "فرص العمل":
      icon = briefcase;
      cardStyle = classes.Third;
      break;
    case "سهولة الدراسة":
      icon = schoolOutline;
      cardStyle = classes.Fourth;
      break;
    default:
      icon = cashOutline;
      cardStyle = classes.Fifth;
  }
  const [text, setText] = useState<string>("");
  function onHover() {
    setText(classes.StyledText);
  }
  function onLeave() {
    setText("");
  }
  return (
    <>
      <IonCard
        className={classes.Card + " " + cardStyle}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <IonCardHeader>
          <IonCardSubtitle>
            <IonIcon icon={icon} className={classes.Icon + " " + text} />
          </IonCardSubtitle>
          <IonCardTitle className={text}>{name} </IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </>
  );
};

export default PrefrenceSelection;
