/**
 * @fileoverview
 * 
 * @author Bell Eapen
 * 
 */
import { R4 } from '@ahryman40k/ts-fhir-types'
import VueFormGeneratorSchema from 'schema';
import VueFormGeneratorField from 'field';
import Fform from 'fform';
import VueFormGeneratorGroup from 'group';

export const FhirFormVue = (fhirjson: any) => {

  // validation succeeded
  const  schemaValidationResult = R4.RTTI_Questionnaire.decode(fhirjson) // => Right if good, Left if not
  const  fhirq: R4.IQuestionnaire = <R4.IQuestionnaire> schemaValidationResult.value;

  let ffvue_qresp : R4.IQuestionnaireResponse = { 
    resourceType : "QuestionnaireResponse",
    item: [],
    status: R4.QuestionnaireResponseStatusKind._inProgress
  }

  let ffvue_schema : VueFormGeneratorSchema = {
    fields: [],
    groups: []
  }

  fhirq.item?.forEach(function(item, _){ // _ is the ignored index

    // If the item is a group
    if(item.type == R4.Questionnaire_ItemTypeKind._group){
      // Add legend to the group
      let ffvue_group :VueFormGeneratorGroup = {
        legend: item.text?.toString(),
        fields: []
      }
      
      // Get group items from outer item
      let groupitems: Array<R4.IQuestionnaire_Item> = []
      if(item.item)
        groupitems = item.item
      groupitems.forEach(function(groupitem, _){
        ffvue_group.fields?.push(Fprocess(groupitem))
        ffvue_qresp.item?.push(Rprocess(groupitem))
      })

      ffvue_schema.groups?.push(ffvue_group)

    // Just push the fields if not a group
    }else{ 
      ffvue_schema.fields?.push(Fprocess(item))
      ffvue_qresp.item?.push(Rprocess(item))
    }
  });

  let fform : Fform = {
    model: ffvue_qresp,
    schema: ffvue_schema
  }
  
  console.log(JSON.stringify(fform))

  return fform
};

/**
 * Takes a R4.IQuestionnaire_Item and returns the VueFormGeneratorField
 * @param {R4.IQuestionnaire_Item} item
 * 
 * @returns {VueFormGeneratorField} 
 */
const Fprocess = (item: R4.IQuestionnaire_Item) => {
  let ffvue_field :VueFormGeneratorField = {
    type: item.type?.toString(),
    inputType: 'text', //@TODO: change type accordingly
    label: item.text?.toString(),
    id: item.linkId?.toString(),
    model: 'item.answer[0].valueString' //@TODO: change type accordingly
  }
  return ffvue_field
}

const Rprocess = (item: R4.IQuestionnaire_Item) => {
  let qresp_item :R4.IQuestionnaireResponse_Item = {
    linkId: item.linkId,
    text: item.text,
    answer: []
  }
  //@TODO: check type and change accordingly
  let ans: R4.IQuestionnaireResponse_Answer = {
    valueString: ''
  }
  qresp_item.answer?.push(ans)
  return qresp_item
}