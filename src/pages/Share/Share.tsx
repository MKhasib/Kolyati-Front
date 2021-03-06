import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonContent,
  IonImg,
  IonRow,
  IonCol,
  IonText,
  IonToast,
  IonItem,
  IonList,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import classes from "./Share.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BASE_URL, LOCAL_STORAGE_KEY_USER_ID } from "../../containers/App";
import CaseNotFound from "../../components/CaseNotFound/CaseNotFound";
import Case from "../../components/Case/Case";
import axios from "axios";
import { CaseShortData } from "../../Models/CaseShortData";

const SharePage: React.FC = () => {
  const api=axios.create({
    baseURL:BASE_URL
  });
  const textCenter = { textAlign: "center" };
  const userData = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
  let userId:string="";
  if(userData)
  userId=JSON.parse(userData);
  const [showToast, setShowToast] = useState(false);
  const [casses, setCasses] = useState<CaseShortData[]>([]);
  let canShare = null;
  let cassesElements = null;
useEffect(() => {
  let isMounted = true;

  async function fetchCasses(){
    try{
   const res=await api.get(`/user/${userId}`);
 if(res.status===200)
 {if(isMounted)
   setCasses(res.data);
 }
 }
   catch(err){
     console.log(err);
   }
  }
  fetchCasses();
  return () => { isMounted = false };

}, [api,userId]);
  if (casses.length > 0) { 
     
    cassesElements = (
      <>
      <h1>حالاتي</h1>
        {casses?.map((data) => (
          <IonRow key={data.id} dir="rtl">
            <IonCol>
              <Case
               id={data.id}
               author={data.author}
               createdTime={data.createdTime}
               tags={data.tags}
               advicesNumber={data.advicesNumber}
               votesNumber={data.votesNumber}
               description={data.description}
              />
                <CopyToClipboard text={"" + data.id}>
                <IonButton color="danger" onClick={() => setShowToast(true)}>
                <IonText color="light">مشاركة</IonText>
                </IonButton>
              </CopyToClipboard>
            </IonCol>
          </IonRow>   
        ))}
      </>
    );
  }
  if (casses.length!==0) {
    canShare = (
      <>
        <IonList>
          <IonRow>
            <IonCol>
              <IonImg
                className={classes.rowStyle}
                src={require("../../res/follow.svg")}
              />
            </IonCol>
          </IonRow>
        <IonRow className={classes.whiteBackground} dir="rtl">
            <IonCol>
              <IonText>
                <h1>إحكي لأصحابك ومعارفك</h1>
              </IonText>
              <IonText color="medium">
                <h6>شارك حالتك ليساعدوك تختار تخصصك</h6>
              </IonText>
            </IonCol>
          </IonRow>
          {cassesElements}
          <IonItem lines="none"></IonItem>
        </IonList>
       
      </>
    );
  } else {

    canShare = <CaseNotFound />;
  }
  return (
    <>
      <IonHeader dir="rtl">
        <IonToolbar>
          <IonTitle>شارك حالتي</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="light" style={textCenter}>
        {canShare}
      </IonContent>
      <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="تم نسخ مُحدد الحالة"
          cssClass={classes.centerText}
          color="success"
          duration={200}
        />
    </>
  );
};
export default SharePage;
