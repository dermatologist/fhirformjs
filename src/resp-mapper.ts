import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';
import FhirForm from './fhirForm';

export const supportedValueTypes = [
  'valueString',
  'valueBoolean',
  'valueDate',
  'valueInteger',
  'valueDecimal',
  'valueCoding',
];

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
      item.answer = item.answer.concat(
        formValueToFhirAnswer(myValue, myElement, schema, myProperty)
      );
    }
  });

  return fhirResponse;
};

// https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
const getObject = function(theObject: Object | Object[], theProperty: string, returnObjects?: boolean) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      // end of the road of value is a string
      if (typeof theObject[i] === "string") {
        break;
      }

      result = getObject(theObject[i], theProperty, returnObjects);
      if (result) {
        break;
      }
    }
  } else {
    for (var prop in theObject) {
      if (prop === theProperty && (!(theObject[prop] instanceof Object) || returnObjects) ) {
        return theObject[prop];
      }
      if (
        theObject[prop] instanceof Object ||
        theObject[prop] instanceof Array
      ) {
        result = getObject(theObject[prop], theProperty, returnObjects);
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
  supportedValueTypes.reduce(
    (answer: Array<{ [x: string]: any }>, propertyName) => {
      if (fhirElement && fhirElement.hasOwnProperty(propertyName)) {
        const linkProperties = getObject(jsonSchema.properties, linkId, true)      
        const enumNames = linkProperties?.enumNames;
        if (enumNames) {
          const valueIndex = linkProperties.enum.indexOf(
            formDataValue
          );
          answer.push({
            [propertyName]: {
              code: `${formDataValue}`,
              display: enumNames[valueIndex] || null,
            },
          });
        } else {
          answer.push({
            [propertyName]: formDataValue,
          });
        }
      }
      return answer;
    }, 
    []
);
