// Copyright (c) 2020 Bell Eapen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';
import FhirJsonField from './field';
import FhirJsonSchema from './schema';
import FhirForm from './fhirForm';
export const FhirJsonForm = (fhirq: R4.IQuestionnaire): FhirForm => {
  let ALL_PROPERTIES: any = {};
  let UISchema: any = {};

  let ffvue_qresp: R4.IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    item: [],
    status: R4.QuestionnaireResponseStatusKind._inProgress,
  };

  fhirq.item?.forEach(function(item, _) {
    // _ is the ignored index

    // If the item is a group
    if (item.type === R4.Questionnaire_ItemTypeKind._group) {
      // Add legend to the group
      let groupProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();
      let groupTitle =
        typeof item.text === 'undefined' ? uuid() : item.text.toString();
      ALL_PROPERTIES[groupProperty] = {};
      UISchema[groupProperty] = {};
      ALL_PROPERTIES[groupProperty]['type'] = 'object';
      ALL_PROPERTIES[groupProperty]['title'] = groupTitle;
      ALL_PROPERTIES[groupProperty]['properties'] = {};
      // Get group items from outer item
      let groupitems: Array<R4.IQuestionnaire_Item> = [];
      if (item.item) groupitems = item.item;
      groupitems.forEach(function(groupitem, _) {
        let myProperty =
          typeof groupitem.linkId === 'undefined'
            ? uuid()
            : groupitem.linkId.toString();
        ALL_PROPERTIES[groupProperty]['properties'][myProperty] = Fprocess(
          groupitem
        );
        if (GetOptions(groupitem) !== '') {
          ALL_PROPERTIES[groupProperty]['properties'][myProperty][
            'enum'
          ] = GetOptions(groupitem);
        }
        if (GetWidget(groupitem) !== '') {
          UISchema[groupProperty][myProperty] = {};
          UISchema[groupProperty][myProperty]['ui:widget'] = GetWidget(
            groupitem
          );
        }
        ffvue_qresp.item?.push(Rprocess(groupitem));
      });
      // Just push the fields if not a group
    } else {
      let myProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();
      ALL_PROPERTIES[myProperty] = Fprocess(item);
      if (GetOptions(item) !== '') {
        ALL_PROPERTIES[myProperty]['enum'] = GetOptions(item);
      }
      if (GetWidget(item) !== '') {
        UISchema[myProperty] = {};
        UISchema[myProperty]['ui:widget'] = GetWidget(item);
      }
      ffvue_qresp.item?.push(Rprocess(item));
    }
  });

  let fform_schema: FhirJsonSchema = {
    type: 'object',
    title: fhirq.id?.toString(),
    properties: ALL_PROPERTIES,
  };
  let fform: FhirForm = {
    model: ffvue_qresp,
    schema: fform_schema,
    uischema: UISchema,
  };
  return fform;
};

/**
 * Takes a R4.IQuestionnaire_Item and returns the VueFormGeneratorField
 * @param {R4.IQuestionnaire_Item} item
 *
 * @returns {VueFormGeneratorField}
 */
const Fprocess = (item: R4.IQuestionnaire_Item) => {
  let ff_field: FhirJsonField = {
    type: GetControlType(item),
    title: item.text?.toString(),
  };
  return ff_field;
};

const GetOptions = (item: R4.IQuestionnaire_Item) => {
  let choiceOptions: string[] = [];
  if (typeof item.answerOption !== 'undefined') {
    item.answerOption?.forEach(function(choice, _) {
      let myCode =
        typeof choice.valueCoding === 'undefined'
          ? ''
          : choice.valueCoding.code?.toString();
      choiceOptions.push(typeof myCode === 'undefined' ? '' : myCode);
    });
    return choiceOptions;
  }
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._choice ||
  //   item.type == R4.Questionnaire_ItemTypeKind._openChoice
  // ) {
  //   return 'select';
  // }
  // if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
  //   return 'boolean';
  // }
  return '';
};

const GetWidget = (item: R4.IQuestionnaire_Item) => {
  if (
    item.type === R4.Questionnaire_ItemTypeKind._date ||
    item.type === R4.Questionnaire_ItemTypeKind._dateTime ||
    item.type === R4.Questionnaire_ItemTypeKind._time
  ) {
    return 'datetime';
  }
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._choice ||
  //   item.type == R4.Questionnaire_ItemTypeKind._openChoice
  // ) {
  //   return 'select';
  // }
  // if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
  //   return 'boolean';
  // }
  return '';
};

const GetControlType = (item: R4.IQuestionnaire_Item) => {
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._date ||
  //   item.type == R4.Questionnaire_ItemTypeKind._dateTime ||
  //   item.type == R4.Questionnaire_ItemTypeKind._time
  // ) {
  //   return 'dateTimePicker';
  // }
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._choice ||
  //   item.type == R4.Questionnaire_ItemTypeKind._openChoice
  // ) {
  //   return 'select';
  // }
  if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
    return 'boolean';
  }
  return 'string';
};

const GetValueType = (item: R4.IQuestionnaire_Item) => {
  if (item.type === R4.Questionnaire_ItemTypeKind._date) {
    return 'item.answer[0].valueDate';
  }
  if (item.type === R4.Questionnaire_ItemTypeKind._time) {
    return 'item.answer[0].valueTime';
  }
  if (item.type === R4.Questionnaire_ItemTypeKind._dateTime) {
    return 'item.answer[0].valueDateTime';
  }
  if (item.type === R4.Questionnaire_ItemTypeKind._integer) {
    return 'item.answer[0].valueInteger';
  }
  if (item.type === R4.Questionnaire_ItemTypeKind._decimal) {
    return 'item.answer[0].valueDecimal';
  }
  if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
    return 'item.answer[0].valueBoolean';
  }
  return 'item.answer[0].valueString';
};

const Rprocess = (item: R4.IQuestionnaire_Item) => {
  let qresp_item: R4.IQuestionnaireResponse_Item = {
    linkId: item.linkId,
    text: item.text,
    answer: [],
  };

  var key = GetOnlyValueType(GetValueType(item));
  let ans: R4.IQuestionnaireResponse_Answer = {};
  ans[key] = '';
  qresp_item.answer?.push(ans);
  return qresp_item;
};

/**
 *
 * @param valueType {string} full model path
 *
 * @returns {sting} just the type
 */
const GetOnlyValueType = (valueType: string) => {
  var pieces = valueType.split(/[\s.]+/); // Split on .
  return pieces[pieces.length - 1];
};
