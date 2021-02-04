import React ,{useState,useEffect}from 'react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import Welcome from '../components/Welcome/Welcome';
import Main from '../components/Main/Main';

export const LOCAL_STORAGE_KEY_CASSES_ID="koliyati.casses.ids";
export const LOCAL_STORAGE_KEY_USER_ID="koliyati.user.id";
export const LOCAL_STORAGE_KEY_FIRST_TIME="koliyati.first.time";
export const LOCAL_STORAGE_KEY_TAWIJIHI_TYPE="koliyati.tawjihitype";
export const LOCAL_STORAGE_KEY_GPA="koliyati.gpa";
export const LOCAL_STORAGE_KEY_MAJORS_SHOW="koliyati.majors.show";
export const LOCAL_STORAGE_KEY_MAJORS="koliyati.majors";
export const LOCAL_STORAGE_KEY_PREFRENCES="koliyati.prefrences";
export const LOCAL_STORAGE_KEY_PREFRENCES_SELECTED="koliyati.prefrences.selected";
export const LOCAL_STORAGE_KEY_NAME="koliyati.prefrences.name";
export const LOCAL_STORAGE_KEY_LOCATION="koliyati.prefrences.location";
export const LOCAL_STORAGE_KEY_DESCRIPTION="koliyati.prefrences.description";
export const LOCAL_STORAGE_KEY_CREATED="koliyati.created";

export const BASE_URL="https://kolyati.herokuapp.com/api/v1/";
export function fold(input:string, lineSize:number,lineArra:string[]):string[] {
  const lineArray =lineArra|| [];
  if (input.length <= lineSize) {
      lineArray.push(input);
      return lineArray;
  }
  lineArray.push(input.substring(0, lineSize));
  var tail = input.substring(lineSize);
  return fold(tail, lineSize, lineArray);
}
const App: React.FC = () =>{    
  const [firstTime,setFirstTime]=useState<boolean>(true);

  useEffect(()=>{
    const parsedData= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_FIRST_TIME)!);
    if(!parsedData)
    return;
    setFirstTime(false);  

  },[]);

  const changeFirstTimeState=()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY_FIRST_TIME,JSON.stringify({firstTime:false}));
    const { v4: uuidv4 } = require('uuid');
    const id=uuidv4();
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID,JSON.stringify(id))
    setFirstTime(false);
  };
  
  let page=null;
  if(firstTime)
  {
  page=<Welcome click={changeFirstTimeState}/>
  }
  else
  {
    page= <Main/>
  }
  return(
 page
    );

  };
export default App;
