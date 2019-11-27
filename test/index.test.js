/* eslint-env mocha */
const fetch = require('isomorphic-fetch');
const Fhirformjs = require('../src/index');

describe('fhirformjs', () => {
  it('should generate Fhirform', async () => {
    await fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/417960/_history/1?_pretty=true&_format=json')
      .then((response) => response.json())
      .then(async (myJson) => {
        const ff = Fhirformjs.fhirformjs(myJson);
        console.log(ff);
      });

  });

  it('should add response to QuestionnaireResponse', async () => {
    await fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/417960/_history/1?_pretty=true&_format=json')
      .then((response) => response.json())
      .then((myJson) => {
        const ff = Fhirformjs.fhirformResp(myJson, {});
        console.log(ff);
      });
  });
});
