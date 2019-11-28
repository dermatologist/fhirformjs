/* eslint-env mocha */
const fetch = require('isomorphic-fetch');
const Ffvue = require('../src/ffvue');

describe('ffvue', () => {
  it('should show id', async () => {
    await fetch('https://www.hl7.org/fhir/questionnaire-example-f201-lifelines.json')
      .then((response) => response.json())
      .then(async (myJson) => {
        const ff = Ffvue.ffvue(myJson);
        console.log(ff);
      });

  });

//   it('should add response to QuestionnaireResponse', async () => {
//     await fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/417960/_history/1?_pretty=true&_format=json')
//       .then((response) => response.json())
//       .then((myJson) => {
//         const ff = Fhirformjs.fhirformResp(myJson, {});
//         console.log(ff);
//       });
//   });
});
