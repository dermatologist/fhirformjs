// export const sum = (a: number, b: number) => {
//   if ('development' === process.env.NODE_ENV) {
//     console.log('boop');
//   }
//   return a + b;
// };

import { R4 } from '@ahryman40k/ts-fhir-types'
import VueFormGeneratorSchema from 'schema';
import Fform from 'fform';

export const Ffvue = (fhirjson: any) => {

  // validation succeeded
  const  schemaValidationResult = R4.RTTI_Questionnaire.decode(fhirjson) // => Right if good, Left if not
  const  fhirq: R4.IQuestionnaire = <R4.IQuestionnaire> schemaValidationResult.value;




  fhirq.item?.forEach(function(val, index){
    console.log(val, index)

  });

  let ffvue_qresp : R4.IQuestionnaireResponse = { 'resourceType' : "QuestionnaireResponse"}
  

  let ffvue_schema : VueFormGeneratorSchema = {}

  let fform : Fform = {
    model: ffvue_qresp,
    schema: ffvue_schema
  }
  
  console.log(fform)

  return fform
};