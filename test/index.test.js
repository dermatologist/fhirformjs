/* eslint-env mocha */
const fetch = require('isomorphic-fetch');
const Fhirformjs = require('../src/index');

describe('fhirformjs', () => {
  it('should generate Fhirform', () => {
    fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/417960/_history/1?_pretty=true&_format=json')
      .then((response) => response.json())
      .then((myJson) => {
        const ff = Fhirformjs.fhirformjs(myJson);
        console.log(ff.schema);
        console.log(ff.ui);
      });
  });

  it('should add response to QuestionnaireResponse', () => {
    fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/417960/_history/1?_pretty=true&_format=json')
      .then((response) => response.json())
      .then((myJson) => {
        const ff = Fhirformjs.fhirformResp(myJson, {});
        console.log(ff);
        for (var key in ff) {
          var value = ff[key];
          console.log(value);
        }
      });
  });
});
