import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';

export const FhirJsonResp = (
  fhirResponse: R4.IQuestionnaireResponse,
  formData: any
): R4.IQuestionnaireResponse => {
  fhirResponse.item?.forEach(function(item, _) {
    let myProperty =
      typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();

    let myValue = getObject(formData, myProperty);

    let myElement: any = item.answer?.pop();

    if (myElement && myElement.hasOwnProperty('valueString'))
      item.answer?.push({ valueString: myValue });
    if (myElement && myElement.hasOwnProperty('valueBoolean'))
      item.answer?.push({ valueBoolean: myValue });
    if (myElement && myElement.hasOwnProperty('valueDate'))
      item.answer?.push({ valueDate: myValue });
    if (myElement && myElement.hasOwnProperty('valueInteger'))
      item.answer?.push({ valueInteger: myValue });
  });

  return fhirResponse;
};

// https://stackoverflow.com/questions/15523514/find-by-key-deep-in-a-nested-array
const getObject = function(theObject, theProperty) {
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
