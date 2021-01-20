import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonMenuButton,
  IonToast,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY_USER_ID } from "../../containers/App";
import axios from "axios";
import CaseNotFound from "../../components/CaseNotFound/CaseNotFound";
import CaseDisplay from "../../components/CaseDisplay/CaseDisplay";
import Case from "../../Models/Case";
import classes from "./CaseShow.module.css";
export const Context = React.createContext({
  userId: "",
  caseOwnerId: "",
  majorChoices: [""],
  handleClick: (
    name: string,
    majorId: string,
    selections: string[],
    description: string
  ) => {},
  handleUpVote:(userId:string,majorId:string)=>{},
  handleDownVote:(userId:string,majorId:string)=>{}
});
const api = axios.create({
  baseURL: `http://localhost:8080/`,
});
const CaseShow: React.FC = () => {
  const [created, setCreated] = useState<string>();
  const userIdData = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID)!
  );
  const [majorChoices, setMajorChoices] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [caseState, setCaseState] = useState<Case>();
  useEffect(() => {
    const fetchCase = async () => {
      try {
        const url = window.location.href;
        const caseId = url.substring(url.lastIndexOf("/"));
        const result = await api.get(`/api/v1/case${caseId}/${userIdData}`);
        if(result.status===200)
        {setCreated(caseId);
        setCaseState(result.data);}
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCase();
  }, []);
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
            handleClick: (
              name: string,
              majorId: string,
              selections: string[],
              description: string
            ) => {
              handleAdviceSend(name, majorId, selections, description);
            },
            handleUpVote:(userId:string,majorId:string)=>{
              handleVote(userId,majorId,1);

            },
            handleDownVote:(userId:string,majorId:string)=>{
              handleVote(userId,majorId,-1);

            }

          }}
        >
          <CaseDisplay caseInformation={caseState} />
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
      setToastMessage("ضع تقييم لجودة التعليم");
      setShowToast(true);
      return;
    }
    if (selections[1] === undefined) {
      setToastMessage("ضع تقييم لفرص العمل في السوق");
      setShowToast(true);
      return;
    }
    if (selections[2] === undefined) {
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
    console.log({
      major: major,
      rating: selections,
      description: description,
      userId: userIdData,
      author: name,
    });
    console.log(
      JSON.stringify({
        major: major?.tagName,
      })
    );
    console.log(
      JSON.stringify({
        tagName: major?.tagName,
        majorId: majorId,
        rating: selections,
        description: description,
        userId: userIdData,
        author: name,
      })
    );
    const updateCase = async () => {
      console.log(JSON.stringify({
        tagName: major?.tagName,
        majorId: majorId,
        rating: selections,
        description: description,
        userId: userIdData,
        author: name,
      }))
      try {
        const result = await api.post(`/api/v1/advice/${caseState!._id}`, {
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
  function handleVote(userId:string,majorId:string,type:1|-1){
const data=findAdviceVotingData(userId,majorId);
const voting=data?.advice.voting;
console.log(data)
for(var i=0;i<voting!.length;i++)
{
  if(voting![i].userId===userIdData&&voting![i].result===type)
  {
    setToastMessage("لا يمكنك التقييم أكثر من مرة");
    setShowToast(true);
    return;
  }
}
const updateAdvice = async () => {
 console.log( JSON.stringify({
    tagName:data?.tagName,
    majorId:data?.majorId,
    advice:data?.advice,
    vote:{userId:userIdData,result:type}
  }))
  try {
    const result = await api.post(`/api/v1/voting/${caseState!._id}`, {
      tagName:data?.tagName,
      majorId:data?.majorId,
      advice:data?.advice,
      vote:{userId:userIdData,result:1}
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
function findAdviceVotingData(userId:string,majorId:string)
{
  let author=null;
for(var i=0;i<caseState!.tags.length;i++)
{
const tag=caseState!.tags![i];
for(var j=0;j<tag.majors.length;j++)
{
const major=tag.majors[j];
if(major._id===majorId)
for(var k=0;k<major.advices!.length;k++)
{
const advice=major.advices![k];

if(advice.userId===userId)
{ 
  author={tagName:tag.tagName,majorId:major._id,advice:advice};
  break;
}

}
if(author)
break;
}
if(author)
break;
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