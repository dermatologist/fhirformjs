// Copyright (c) 2020 Bell Eapen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';
import FhirJsonField from './field';
import FhirJsonSchema from './schema';
import FhirForm from './fhirForm';

export const FhirJsonForm = (
  fhirQuestionnaire: R4.IQuestionnaire
): FhirForm => {
  let ALL_PROPERTIES: any = {};
  let requiredProperties: string[] = [];
  let UISchema: any = {};

  let fhirQuestionnaireResponse: R4.IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    item: [],
    status: R4.QuestionnaireResponseStatusKind._inProgress,
  };

  fhirQuestionnaire.item?.forEach(function(item, _) {
    // _ is the ignored index

    // If the item is a group
    if (item.type === R4.Questionnaire_ItemTypeKind._group) {
      // Add legend to the group
      let groupProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();
      let groupTitle =
        typeof item.text === 'undefined' ? uuid() : item.text.toString();

      UISchema[groupProperty] = {};
      ALL_PROPERTIES[groupProperty] = {};
      ALL_PROPERTIES[groupProperty]['type'] = 'object';
      ALL_PROPERTIES[groupProperty]['title'] = groupTitle;
      ALL_PROPERTIES[groupProperty]['properties'] = {};

      // Get group items from outer item
      let groupItems: Array<R4.IQuestionnaire_Item> = [];

      if (item.item) groupItems = item.item;

      groupItems.forEach(function(groupItem, _) {
        let myProperty =
          typeof groupItem.linkId === 'undefined'
            ? uuid()
            : groupItem.linkId.toString();

        ALL_PROPERTIES[groupProperty]['properties'][
          myProperty
        ] = GetItemProperties(groupItem);

        if (groupItem.required) {
          if (ALL_PROPERTIES[groupProperty]['required'] === undefined) {
            ALL_PROPERTIES[groupProperty]['required'] = []
          }
          ALL_PROPERTIES[groupProperty]['required'].push(myProperty)
        }

        if (GetWidget(groupItem) !== '') {
          UISchema[groupProperty][myProperty] = {
            'ui:widget': GetWidget(groupItem),
          };
        }
        
        const uiOptions = GetUIOptions(groupItem)
        if (uiOptions !== '') {
          UISchema[groupProperty][myProperty] = {
            'ui:options': uiOptions,
          };

          if (uiOptions.unit) {
            UISchema[groupProperty][myProperty]['ui:placeholder'] = uiOptions.unit
          }
        }

        fhirQuestionnaireResponse.item?.push(CreateResponseItem(groupItem));
      });

      item.required && requiredProperties.push(groupProperty)

      // Just push the fields if not a group
    } else {
      let myProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();

      ALL_PROPERTIES[myProperty] = GetItemProperties(item);

      if (GetWidget(item) !== '') {
        UISchema[myProperty] = {
          'ui:widget': GetWidget(item),
        };
      }

      if (GetUIOptions(item) !== '') {
        UISchema[myProperty] = {
          'ui:options': GetUIOptions(item),
        };
      }

      fhirQuestionnaireResponse.item?.push(CreateResponseItem(item));

      item.required && requiredProperties.push(myProperty)
    }
  });

  let fhirJsonSchema: FhirJsonSchema = {
    type: 'object',
    title: fhirQuestionnaire.id?.toString(),
    properties: ALL_PROPERTIES,
    required: requiredProperties,
  };
  let fhirForm: FhirForm = {
    model: fhirQuestionnaireResponse,
    schema: fhirJsonSchema,
    uiSchema: UISchema,
  };
  return fhirForm;
};

/**
 * Takes a R4.IQuestionnaire_Item and returns an extended FhirJsonField
 * @param {R4.IQuestionnaire_Item} item
 *
 * @returns {FhirJsonField} properties
 */
const GetItemProperties = (item: R4.IQuestionnaire_Item) => {
  const properties = ProcessQuestionnaireItem(item);
  const itemOptions = GetOptions(item);

  if (itemOptions !== '') {
    return { ...properties, ...itemOptions };
  }

  return properties;
};

/**
 * Takes a R4.IQuestionnaire_Item and returns the VueFormGeneratorField
 * @param {R4.IQuestionnaire_Item} item
 *
 * @returns {VueFormGeneratorField}
 */
const ProcessQuestionnaireItem = (item: R4.IQuestionnaire_Item) => {
  let ff_field: FhirJsonField = {
    type: GetControlType(item),
    title: item.text?.toString(),
  };
  return ff_field;
};

const GetOptions = (item: R4.IQuestionnaire_Item) => {
  let enumOptions: (string|number)[] = [];
  let enumNames: string[] = [];

  if (typeof item.answerOption !== 'undefined') {
    item.answerOption?.forEach(function(choice, _) {
      let code =
        typeof choice.valueCoding === 'undefined'
          ? ''
          : GetControlType(item) === 'integer' 
            ? choice.valueCoding.code && parseInt(choice.valueCoding.code)
            : choice.valueCoding.code?.toString();

      enumOptions.push(typeof code === 'undefined' ? '' : code);

      let display = choice.valueCoding?.display?.toString();
      if (display !== undefined) {
        enumNames.push(display);
      }
    });

    const options = {
      enum: enumOptions,
      enumNames,
    }

    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code === EXTENSION_CHECKBOX) {
      return {
        uniqueItems: true,
        items: {
          type: "string",
          ...options
        }
      }
    }

    return options;
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
  if (
    item.type == R4.Questionnaire_ItemTypeKind._choice ||
    item.type == R4.Questionnaire_ItemTypeKind._openChoice
  ) {
    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code && extensionToWidget[coding?.code]) {
      return extensionToWidget[coding?.code]
    }
  }
  // if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
  //   return 'boolean';
  // }
  return '';
};

const GetUIOptions = (item: R4.IQuestionnaire_Item) => {
  const ext: R4.IExtension = (item.extension || [])[0]
  const splitUrl = ext?.url?.split('/')
  const extensionName = splitUrl && splitUrl[splitUrl.length-1]

  if (ext?.valueCoding?.display && extensionName === 'questionnaire-unit') {
    return {
      unit: ext.valueCoding.display
    }
  }

  return '';
}

const GetControlType = (item: R4.IQuestionnaire_Item) => {
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._date ||
  //   item.type == R4.Questionnaire_ItemTypeKind._dateTime ||
  //   item.type == R4.Questionnaire_ItemTypeKind._time
  // ) {
  //   return 'dateTimePicker';
  // }

  if (
    item.type == R4.Questionnaire_ItemTypeKind._choice ||
    item.type == R4.Questionnaire_ItemTypeKind._openChoice
  ) {
    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code === EXTENSION_CHECKBOX) {
      return 'array'
    }

    if (coding?.code === EXTENSION_SLIDER) {
      return 'integer'
    }
  }

  if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
    return 'boolean';
  }

  if (item.type == R4.Questionnaire_ItemTypeKind._decimal) {
    return 'number';
  }

  if (item.type == R4.Questionnaire_ItemTypeKind._integer) {
    return 'integer';
  }

  return 'string';
};

const GetValueType = (item: R4.IQuestionnaire_Item) => {
  switch (item.type) {
    case R4.Questionnaire_ItemTypeKind._date:
      return 'item.answer[0].valueDate';
    case R4.Questionnaire_ItemTypeKind._time:
      return 'item.answer[0].valueTime';
    case R4.Questionnaire_ItemTypeKind._dateTime:
      return 'item.answer[0].valueDateTime';
    case R4.Questionnaire_ItemTypeKind._integer:
      return 'item.answer[0].valueInteger';
    case R4.Questionnaire_ItemTypeKind._decimal:
      return 'item.answer[0].valueDecimal';
    case R4.Questionnaire_ItemTypeKind._boolean:
      return 'item.answer[0].valueBoolean';
    case R4.Questionnaire_ItemTypeKind._choice:
    case R4.Questionnaire_ItemTypeKind._openChoice:
      return 'item.answer[0].valueCoding'

    default:
      return 'item.answer[0].valueString';
  }
};

const CreateResponseItem = (item: R4.IQuestionnaire_Item) => {
  let responseItem: R4.IQuestionnaireResponse_Item = {
    linkId: item.linkId,
    text: item.text,
    answer: [],
  };

  var key = GetOnlyValueType(GetValueType(item));
  let ans: R4.IQuestionnaireResponse_Answer = {};

  switch (item.type) {
    case R4.Questionnaire_ItemTypeKind._choice:
    case R4.Questionnaire_ItemTypeKind._openChoice:
      const option = (item.answerOption || [])[0]
      ans[key] = Object
        .keys(option?.valueCoding || {})
        .reduce((acc, prop) => ({...acc, [prop]: ''}), {})
      break;

    default:
      ans[key] = '';
      break;
  }

  responseItem.answer?.push(ans);
  return responseItem;
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


const EXTENSION_DROPDOWN = 'drop-down'
const EXTENSION_RADIOBUTTON = 'radio-button'
const EXTENSION_CHECKBOX = 'check-box'
const EXTENSION_SLIDER = 'slider'
const extensionToWidget = {
  [EXTENSION_DROPDOWN]: 'select',
  [EXTENSION_RADIOBUTTON]: 'radio',
  [EXTENSION_CHECKBOX]: 'checkboxes',
  [EXTENSION_SLIDER]: 'range'
}
