import { IonItem, IonList } from "@ionic/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../../containers/App";
import major from "../../../Models/major";
import { Context } from "../../../pages/CaseShow/CaseShow";
import classes from "./CaseResults.module.css";
import Result from "./Result/Result";
import Statistic from "./Statistics/Statistics";

const CaseResults: React.FC = () => {
  const api = axios.create({
    baseURL: BASE_URL,
  });
  const context = useContext(Context);
  const [topTwoMajors, setTopTwoMajors] = useState<major[]>();
  useEffect(() => {
    let isMounted=true;
    const fetchTopTwoMajors = async () => {
      try {
        const result = await api.get(`/topMajors/${context.caseId}`);
        if (result.status === 200) {
          if(isMounted)
          setTopTwoMajors(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (context.caseId !== "") fetchTopTwoMajors();
    return () => { isMounted = false };

  }, [context,api]);
  return (
    <IonList className={classes.marginButtom}>
      <IonItem>
        <h1 className={classes.margin}>أفضل التخصصات</h1>
      </IonItem>
      {topTwoMajors ? (
        <div>
          <div className={classes.flex}>
            {topTwoMajors.map((e, index) => (
              <div className={classes.basis} key={e._id}>
                <Result
                  major={e}
                  index={index}
                  color={index === 0 ? "#eb596e" : "#339FCE"}
                />
              </div>
            ))}
          </div>
          <IonItem>
            <h2>الإحصائيات</h2>
          </IonItem>
          <Statistic majors={topTwoMajors} />
        </div>
      ) : null}
    </IonList>
  );
};

export default CaseResults;
