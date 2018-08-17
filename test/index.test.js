/* eslint-env mocha */
const fetch = require('isomorphic-fetch');
const Fhirformjs = require('../src/index');

describe('fhirformjs', () => {
  it('should work as expected', () => {
    fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/sickKids/_history/3?_format=json')
      .then((response) => response.json())
      .then((myJson) => {
        const ff = Fhirformjs.fhirformjs(myJson);
        console.log(ff.schema);
        console.log(ff.ui);
      });
  });
});
