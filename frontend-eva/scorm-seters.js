import { ScormProcessGetValue,ScormProcessCommit,ScormProcessSetValue } from "./scorm-utils";

export const setScoreCompletionSuccess =  (answered,quantQuestions,courseCompleted)=>{
   console.log('answered',answered, ' quantQuiestions',quantQuestions,"  completed", courseCompleted)
   let score = Math.round(answered * 100 / quantQuestions);
   score = isNaN(score) ? 0:score
   ScormProcessSetValue('cmi.score.raw', score+'');
   ScormProcessSetValue('cmi.score.min', '0');
   ScormProcessSetValue('cmi.score.max', '100');
   let scoreScaled = score / 100
   ScormProcessSetValue('cmi.score.scaled', scoreScaled + '');

   if(answered === 0){
      ScormProcessSetValue('cmi.completion_status','not attempted');
   }

   if(courseCompleted){
      ScormProcessSetValue('cmi.success_status','passed');
      ScormProcessSetValue('cmi.completion_status', 'completed');
   }else{
      ScormProcessSetValue('cmi.success_status','unknown')
      ScormProcessSetValue('cmi.completion_status', 'incomplete');
   }

   ScormProcessCommit();

}