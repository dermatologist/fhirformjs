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

export const FhirFormVue: any = (fhirjson: any) => {

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

  let index = 0;
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
        ffvue_group.fields?.push(Fprocess(groupitem, index))
        index++
        ffvue_qresp.item?.push(Rprocess(groupitem))
      })

      ffvue_schema.groups?.push(ffvue_group)

    // Just push the fields if not a group
    }else{ 
      ffvue_schema.fields?.push(Fprocess(item, index))
      index++
      ffvue_qresp.item?.push(Rprocess(item))
    }
  });

  let fform : Fform = {
    model: ffvue_qresp,
    schema: ffvue_schema
  }
  
  console.log(JSON.stringify(fform))

  return JSON.stringify(fform)
};

/**
 * Takes a R4.IQuestionnaire_Item and returns the VueFormGeneratorField
 * @param {R4.IQuestionnaire_Item} item
 * 
 * @returns {VueFormGeneratorField} 
 */
const Fprocess = (item: R4.IQuestionnaire_Item, index: number) => {
  let ffvue_field :VueFormGeneratorField = {
    type: GetControlType(item),
    inputType: 'text', //@TODO: change type accordingly
    label: item.text?.toString(),
    id: item.linkId?.toString(),
    textOn: "on",
    textOff: "off",
    dateTimePickerOptions: {
      format: "YYYY-MM-DD HH:mm:ss"
    },
    model: ReplaceZeroWithIndex(GetValueType(item), index) //@TODO: change type accordingly
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
  var key = GetOnlyValueType(GetValueType(item))
  let ans: R4.IQuestionnaireResponse_Answer = {}
  ans[key] = ""
  qresp_item.answer?.push(ans)
  return qresp_item
}

const GetControlType = (item: R4.IQuestionnaire_Item) => {
    if(item.type == R4.Questionnaire_ItemTypeKind._date ||
      item.type == R4.Questionnaire_ItemTypeKind._dateTime ||
      item.type == R4.Questionnaire_ItemTypeKind._time
      ){
        return "dateTimePicker"
      }
    if(item.type == R4.Questionnaire_ItemTypeKind._choice ||
      item.type == R4.Questionnaire_ItemTypeKind._openChoice 
      ){
        return "select"
      }
    if(item.type == R4.Questionnaire_ItemTypeKind._boolean){
        return "switch"
      }
    return "input"  
}

const GetValueType = (item: R4.IQuestionnaire_Item) => {
  if(item.type == R4.Questionnaire_ItemTypeKind._date){
    return "item.answer[0].valueDate"
    }
  if(item.type == R4.Questionnaire_ItemTypeKind._time){
    return "item.answer[0].valueTime"
    }
  if(item.type == R4.Questionnaire_ItemTypeKind._dateTime){
    return "item.answer[0].valueDateTime"
    }
  if(item.type == R4.Questionnaire_ItemTypeKind._integer){
    return "item.answer[0].valueInteger"
    }
  if(item.type == R4.Questionnaire_ItemTypeKind._decimal){
    return "item.answer[0].valueDecimal"
    }
  if(item.type == R4.Questionnaire_ItemTypeKind._boolean){
    return "item.answer[0].valueBoolean"
    }
  return "item.answer[0].valueString"  
}
/**
 * 
 * @param valueType {string} full model path
 * 
 * @returns {sting} just the type
 */
const GetOnlyValueType = (valueType: string) => {
  var pieces = valueType.split(/[\s.]+/) // Split on .
  return pieces[pieces.length-1]
}

const ReplaceZeroWithIndex = (fullString: string, index: number) => {
  return fullString.replace("item.answer[0]", "item["+index.toString()+"].answer[0]")
}