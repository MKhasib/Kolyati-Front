import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle
} from "@ionic/react";

import React from "react";
import { LOCAL_STORAGE_KEY_CASSES_ID } from "../../containers/App";
import classes from "./Nav.module.css";
const Nav: React.FC = (props) => {
  let key = "/Case/";
  const getKey = () => {
    const cassesIdData = localStorage.getItem(LOCAL_STORAGE_KEY_CASSES_ID);
    if (cassesIdData !== undefined && cassesIdData !== null) {
      const cassesId = JSON.parse(cassesIdData!);
      key += cassesId;
    }
  };
  getKey();
  return (
    <IonMenu side="end" menuId="main-menu" contentId="main" dir="rtl">
      <IonHeader dir="rtl">
        <IonToolbar>
          <IonTitle>القائمة</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList dir="rtl">
          <IonMenuToggle>
            <IonItem routerLink="/Home">
              <IonIcon
                slot="start"
                src={require("../../res/Home.svg")}
                className={classes.Icon}
              />

              <IonLabel> الرئيسية</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/Search">
              <IonIcon
                slot="start"
                src={require("../../res/SearchMenu.svg")}
                className={classes.Icon}
              />
              <IonLabel> ابحث</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem routerLink="/caseCreation">
              <IonIcon
                slot="start"
                src={require("../../res/Add.svg")}
                className={classes.Icon}
              />
              <IonLabel> إنشاء </IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem routerLink={key}>
              <IonIcon
                slot="start"
                src={require("../../res/BriefCase.svg")}
                className={classes.Icon}
              />
              <IonLabel> تصفح </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/Share">
              <IonIcon
                slot="start"
                src={require("../../res/Share.svg")}
                className={classes.Icon}
              />
              <IonLabel> مشاركة </IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/AboutUs">
              <IonIcon
                slot="start"
                src={require("../../res/Us.svg")}
                className={classes.Icon}
              />
              <IonLabel> من نحن</IonLabel>
            </IonItem>
          </IonMenuToggle>
          {/* <IonItem  routerLink="/Unversities">
            <IonIcon icon={schoolOutline} slot="start"></IonIcon>
            <IonLabel>الجامعات والتخصصات</IonLabel>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
export default Nav;
