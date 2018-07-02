/* eslint-env mocha */
const fetch = require('isomorphic-fetch');
const Fhirformjs = require('../index');

describe('fhirformjs', () => {
  it('should work as expected', () => {
    fetch('http://hapi.fhir.org/baseDstu3/Questionnaire/sickKids/_history/3?_format=json')
      .then((response) => response.json())
      .then((myJson) => {
        console.log(Fhirformjs.fhirformjs(myJson));
      });
  });
});
