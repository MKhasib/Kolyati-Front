
import classes from "./AdviceElement.module.css";
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,  IonCol, IonGrid, IonInput, IonLabel, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import React, { useContext, useRef }   from "react";
import { Context } from "../../../../../../pages/CaseShow/CaseShow";

 const AdviceElement :React.FC<{majorId:string}>=({majorId})=>{
    const difficalityRef=useRef<HTMLIonSelectElement>(null);
    const staffRef=useRef<HTMLIonSelectElement>(null);
    const transportationRef=useRef<HTMLIonSelectElement>(null);
    const jobRef=useRef<HTMLIonSelectElement>(null);
    const descriptionInputRef=useRef<HTMLIonInputElement>(null);
    const nameInputRef=useRef<HTMLIonInputElement>(null);
    const handleClick= useContext(Context);
function handleSend(){
handleClick.handleClick(""+nameInputRef.current?.value,majorId,[difficalityRef.current?.value,staffRef.current?.value,jobRef.current?.value,transportationRef.current?.value],""+descriptionInputRef.current?.value);
}

  return(
<IonCard>
          <IonCardHeader>
            <IonCardSubtitle className={classes.size+" "+ classes.black}>شارك خبرتك</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
       <IonGrid>
           
          <IonRow>
              <IonCol size="4" className={classes.black+" "+classes.size}>
              صعوبة التخصص
              </IonCol>
              <IonCol className={classes.size}>           
<IonLabel color="medium"  position="floating" >
  التقييم
</IonLabel>
<IonSelect  
color="dark" 
placeholder="سهل جداً" dir="rtl" 
ref={difficalityRef}>
              <IonSelectOption value="سهل جداً">سهل جداً</IonSelectOption>
              <IonSelectOption value="سهل">سهل</IonSelectOption>
              <IonSelectOption value="محايد">محايد</IonSelectOption>
              <IonSelectOption value="متوسط الصعوبة">متوسط الصعوبة</IonSelectOption>
              <IonSelectOption value="صعب">صعب</IonSelectOption>
              <IonSelectOption value="صعب جداً">صعب جداً</IonSelectOption>
            </IonSelect>
              </IonCol>
            </IonRow> 
            <IonRow>
              <IonCol size="4" className={classes.black}>
              كفائة الطاقم التدريسي
              
              </IonCol>
              <IonCol  className={classes.size}>
<IonSelect  
color="dark" 
placeholder="ممتاز" dir="rtl" 
ref={staffRef}>
              <IonSelectOption value="ممتاز">ممتاز</IonSelectOption>
              <IonSelectOption value="جيد جداً">جيد جداً</IonSelectOption>
              <IonSelectOption value="جيد">جيد</IonSelectOption>
              <IonSelectOption value="محايد">محايد</IonSelectOption>
              <IonSelectOption value="مقبول">مقبول</IonSelectOption>
              <IonSelectOption value="سيء">سيء</IonSelectOption>
              <IonSelectOption value="سيء جداً">سيء جداً</IonSelectOption>
            </IonSelect>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="4" className={classes.black}>
    فرص العمل في السوق
                </IonCol>
              <IonCol  className={classes.size}>

<IonSelect  
color="dark" 
placeholder="ممتاز" dir="rtl" 
ref={jobRef}>
              <IonSelectOption value="ممتاز">ممتاز</IonSelectOption>
              <IonSelectOption value="جيد جداً">جيد جداً</IonSelectOption>
              <IonSelectOption value="جيد">جيد</IonSelectOption>
              <IonSelectOption value="محايد">محايد</IonSelectOption>
              <IonSelectOption value="مقبول">مقبول</IonSelectOption>
              <IonSelectOption value="سيء">سيء</IonSelectOption>
              <IonSelectOption value="سيء جداً">سيء جداً</IonSelectOption>
            </IonSelect>
              </IonCol>
            </IonRow>  
            <IonRow>
              <IonCol size="4" className={classes.black}>
                   المواصلات
              </IonCol>
              <IonCol  className={classes.size}>
<IonSelect  
color="dark" 
placeholder="ممتاز" dir="rtl" 
ref={transportationRef}>
              <IonSelectOption value="ممتاز">ممتاز</IonSelectOption>
              <IonSelectOption value="جيد جداً">جيد جداً</IonSelectOption>
              <IonSelectOption value="جيد">جيد</IonSelectOption>
              <IonSelectOption value="محايد">محايد</IonSelectOption>
              <IonSelectOption value="مقبول">مقبول</IonSelectOption>
              <IonSelectOption value="سيء">سيء</IonSelectOption>
              <IonSelectOption value="سيء جداً">سيء جداً</IonSelectOption>
            </IonSelect>
              </IonCol>
            </IonRow>
<IonRow>
           <IonCol size="4" className={classes.black}>
                  الإسم
              </IonCol> 
              <IonCol  className={classes.size}>
                  <IonInput 
                  placeholder="إسمي"
                  className={classes.inputShow}
                  ref={nameInputRef}
                  maxlength={15}

                  />
              </IonCol>
              </IonRow>
            <IonRow>
              <IonCol size="4" className={classes.black}>
                  رأيك
              </IonCol>
              <IonCol  className={classes.size}>
                  <IonInput 
                  placeholder="أعتقد أن.."
                  className={classes.inputShow}
                  ref={descriptionInputRef}
                  type="text"
                  maxlength={100}
                  />
              </IonCol>
            </IonRow> 
            <IonRow className={classes.center} dir="ltr">
                <IonButton className={classes.margin} onClick={handleSend}>
                    إرسال
                </IonButton>
            </IonRow>
       </IonGrid>
       </IonCardContent>
        </IonCard>
          )}
export default AdviceElement;