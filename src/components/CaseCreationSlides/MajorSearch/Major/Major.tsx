import classes from "./Major.module.css";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React from "react";
import { cashOutline, checkmarkCircleOutline, timeOutline } from "ionicons/icons";
 const Major :React.FC<{id:string,name:string,acceptanceRate:string,numberOfHours:string,hourRate:string,university:string,styled:boolean,setMajor:(data:string)=>void}>=(props)=>
{ let styledCard=" ";
let styledTitle=" ";
let styledSubTitle=" ";
let styledIcon=" ";
if(props.styled)
{
  styledCard+=classes.Styled;
  styledTitle+=classes.title;
  styledSubTitle+=classes.subTitle;
  styledIcon+=classes.icon;

}
const setMajor=()=>{
props.setMajor(props.id);
}
return (
        <IonCard dir="rtl"  className={classes.Card+styledCard} onClick={setMajor}>
          <IonCardHeader>
          <IonCardTitle className={styledTitle}>{props.name}</IonCardTitle>
          <IonCardSubtitle className={classes.SubTitle+styledSubTitle}>{props.university }</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow class={classes.Row}>
              <IonCol >
              <span className={classes.Span}>{props.acceptanceRate}</span>

              <IonIcon icon={checkmarkCircleOutline} className={classes.Icon+styledIcon}/>

              </IonCol>
           
              <IonCol >
              <span className={classes.Span}>{props.numberOfHours}</span>

              <IonIcon icon={timeOutline} className={classes.Icon+styledIcon}/>

              </IonCol>
             
              <IonCol >
              <span className={classes.Span}>{props.hourRate}</span>
              <IonIcon icon={cashOutline} className={classes.Icon+styledIcon}/>

              </IonCol>
  
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
)
        }

export default Major;