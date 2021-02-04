import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonToast,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { BASE_URL, LOCAL_STORAGE_KEY_USER_ID } from "../../containers/App";
import axios from "axios";
import CaseNotFound from "../../components/CaseNotFound/CaseNotFound";
import CaseDisplay from "../../components/CaseDisplay/CaseDisplay";
import Case from "../../Models/Case";
import classes from "./CaseShow.module.css";
export const Context = React.createContext({
  userId: "",
  caseOwnerId: "",
  majorChoices: [""],
  caseId: "",
  prefrences:[""],
  handleClick: (
    name: string,
    majorId: string,
    selections: string[],
    description: string
  ) => {},
  handleUpVote: (userId: string, majorId: string) => {},
  handleDownVote: (userId: string, majorId: string) => {},
});

const CaseShow: React.FC = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });
  const [created, setCreated] = useState<string>();

  const userIdData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID)!
  );
  const [majorChoices, setMajorChoices] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [caseState, setCaseState] = useState<Case>();
  useEffect(() => {
    let isMounted=true;

    const fetchCase = async () => {
      try {
        const url = window.location.href;
        const caseId = url.substring(url.lastIndexOf("/"));
        const result = await api.get(`/case${caseId}`);

        if (result.status === 200) {
          if(isMounted)
          {setCreated(caseId);
          setCaseState(result.data);}
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCase();
    return () => { isMounted = false };

  },[api]);
  useEffect(() => {
    if (caseState?.userId) {
      setMajorChoices(caseState.majorsChoice);
    }
  }, [caseState]);
  let component = null;
  if (!created) {
    component = (
      <>
        <IonHeader dir="rtl">
          <IonToolbar>
            <IonTitle>حالتي</IonTitle>
            <IonButton slot="start" fill="clear">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <CaseNotFound />
      </>
    );
  } else {
    component = (
      <>
        <IonHeader dir="rtl">
          <IonToolbar>
            <IonTitle>حالتي</IonTitle>
            <IonButton slot="start" fill="clear">
              <IonMenuButton menu="main-menu"></IonMenuButton>
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <Context.Provider
          value={{
            userId:
              "" +
              JSON.parse("" + localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID)),
            caseOwnerId: "" + caseState?.userId,
            majorChoices: majorChoices,
            prefrences:caseState?.prefrences?caseState.prefrences:[],
            handleClick: (
              name: string,
              majorId: string,
              selections: string[],
              description: string
            ) => {
              handleAdviceSend(name, majorId, selections, description);
            },
            handleUpVote: (userId: string, majorId: string) => {
              handleVote(userId, majorId, 1);
            },
            handleDownVote: (userId: string, majorId: string) => {
              handleVote(userId, majorId, -1);
            },
            caseId: caseState ? caseState!._id : "",
          }}
        >
          {caseState ? <CaseDisplay caseInformation={caseState} /> : null}
        </Context.Provider>
      </>
    );
  }
  function handleAdviceSend(
    name: string,
    majorId: string,
    selections: string[],
    description: string
  ) {
    if (selections[0] === undefined) {
      setToastMessage("ضع تقييم لصعوبة التخصص ");
      setShowToast(true);
      return;
    }
    if (selections[1] === undefined) {
      setToastMessage("ضع تقييم لكفائة الطاقة التدريسي ");
      setShowToast(true);
      return;
    }
    if (selections[2] === undefined) {
      setToastMessage("ضع تقييم لفرص العمل في السوق");
      setShowToast(true);
      return;
    }
    if (selections[3] === undefined) {
      setToastMessage("ضع تقييم لصعوبة المواصلات");
      setShowToast(true);

      return;
    }
    if (name === "") {
      setToastMessage("ضع إسمك ");
      setShowToast(true);
      return;
    }
    if (description === "") {
      setToastMessage("ضع وصفاً لتجربتك ");
      setShowToast(true);
      return;
    }
    const major = caseState?.tags.find((tag) => {
      for (var i = 0; i < tag.majors.length; i++) {
        if (majorId === tag.majors[i]._id) return tag.majors[i];
      }
    });

    const updateCase = async () => {
      try {
        const result = await api.post(`/advice/${caseState!._id}`, {
          tagName: major?.tagName,
          majorId: majorId,
          rating: selections,
          description: description,
          userId: userIdData,
          author: name,
        });
        if (result.status === 200) {
          setCaseState(result.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    updateCase();
  }
  function handleVote(userId: string, majorId: string, type: number) {
    const data = findAdviceVotingData(userId, majorId);
    const voting = data?.advice.voting;
    if(userIdData===data?.advice.userId)
    {
      setToastMessage("لا يمكنك التصويت لنفسك ");
        setShowToast(true);
        return;
    }
    for (var i = 0; i < voting!.length; i++) {
      if (voting![i].userId === userIdData && voting![i].result === type) {
        setToastMessage("لا يمكنك التقييم أكثر من مرة");
        setShowToast(true);
        return;
      }
    }
    const updateAdvice = async () => {
      try {
        const result = await api.post(`/voting/${caseState!._id}`, {
          tagName: data?.tagName,
          majorId: data?.majorId,
          userId: data?.advice.userId,
          vote: { userId: userIdData, result: type },
        });
        if (result.status === 200) {
          setCaseState(result.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    updateAdvice();
  }
  function findAdviceVotingData(userId: string, majorId: string) {
    let author = null;
    for (var i = 0; i < caseState!.tags.length; i++) {
      const tag = caseState!.tags![i];
      for (var j = 0; j < tag.majors.length; j++) {
        const major = tag.majors[j];
        if (major._id === majorId)
          for (var k = 0; k < major.advices!.length; k++) {
            const advice = major.advices![k];

            if (advice.userId === userId) {
              author = {
                tagName: tag.tagName,
                majorId: major._id,
                advice: advice,
              };
              break;
            }
          }
        if (author) break;
      }
      if (author) break;
    }
    return author;
  }
  return (
    <>
      {component}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        cssClass={classes.center}
        message={toastMessage}
        color="danger"
        duration={500}
      />
    </>
  );
};
export default CaseShow;
