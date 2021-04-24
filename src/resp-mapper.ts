import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';
import FhirForm from './fhirForm';

export const supportedValueTypes = [
  'valueString',
  'valueBoolean',
  'valueDate',
  'valueInteger',
  'valueDecimal',
  'valueCoding'
]

export const FhirJsonResp = (
  fhirResponse: R4.IQuestionnaireResponse,
  formData: any,
  schema: FhirForm['schema']
): R4.IQuestionnaireResponse => {
  fhirResponse.item?.forEach(function(item, _) {
    let myProperty =
      typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();

    let myValue = getObject(formData, myProperty);

    let myElement = item.answer?.pop();

    if (myElement && item.answer) {
      item.answer = item.answer.concat(formValueToFhirAnswer(myValue, myElement, schema, myProperty))
    }
  });

  return fhirResponse;
};

// https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
const getObject = function(theObject: Object|Object[], theProperty: string) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i], theProperty);
      if (result) {
        break;
      }
    }
  } else {
    for (var prop in theObject) {
      //console.log(prop + ': ' + theObject[prop]);
      if (prop === theProperty) {
        if (theObject[prop] instanceof Object) {
        } else {
          return theObject[prop];
        }
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        result = getObject(theObject[prop], theProperty);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
};

const formValueToFhirAnswer = (
  formDataValue: String | Object,
  fhirElement: R4.IQuestionnaireResponse_Answer,
  jsonSchema: FhirForm['schema'],
  linkId: string
) =>
  supportedValueTypes.reduce((answer: Array<{ [x: string]: any }>, propertyName) => {
    if (fhirElement && fhirElement.hasOwnProperty(propertyName)) {
      const enumNames = jsonSchema.properties[linkId]?.enumNames
      if (enumNames) {
        const valueIndex = jsonSchema.properties[linkId].enum.indexOf(formDataValue)
        answer.push({
          [propertyName]: {code: formDataValue, display: enumNames[valueIndex]}
        })
      }
      else {
        answer.push({
          [propertyName]: formDataValue
        })
      }
    }
    return answer
  }, [])