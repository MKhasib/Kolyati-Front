import {
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Case from "../../components/Case/Case";
import { BASE_URL } from "../../containers/App";
import { CaseShortData } from "../../Models/CaseShortData";
import classes from "./Home.module.css";
const Home: React.FC = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });
  const [casses, setCases] = useState<Array<CaseShortData>>([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await api.get("/cases");
        if (isMounted)
        setCases(data.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
    return () => { isMounted = false };
  }, [api]);
  const fullHeight = { height: "100%" };
  return (
    <>
      <IonHeader dir="rtl">
        <IonToolbar>
          <IonTitle>الصفحة الرئيسية</IonTitle>
          <IonButton slot="start" fill="clear">
            <IonMenuButton menu="main-menu"></IonMenuButton>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonListHeader dir="rtl">
          <h2> أحدث الحالات </h2>
        </IonListHeader>
        <IonInfiniteScroll>
          <IonList dir="rtl" style={fullHeight} className={classes.list}>
            <div className={classes.flex}>
              {casses?.map((data) => (
                <div key={data.id} className={classes.flexBasis}>
                  <Case
                    id={data.id}
                    author={data.author}
                    createdTime={data.createdTime}
                    tags={data.tags}
                    advicesNumber={data.advicesNumber}
                    votesNumber={data.votesNumber}
                    description={data.description}
                  />
                </div>
              ))}
            </div>
          </IonList>
        </IonInfiniteScroll>
      </IonContent>
    </>
  );
};

export default Home;
