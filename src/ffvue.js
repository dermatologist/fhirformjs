/* eslint-disable prefer-destructuring */
const fhirpath = require('fhirpath');

const ffvue = (fhirjson) => {

    const returnJson = {};

    returnJson.$id = fhirpath.evaluate(fhirjson, 'Questionnaire.url')[0];
    returnJson.$schema = "http://json-schema.org/draft-07/schema#";
    returnJson.title = fhirpath.evaluate(fhirjson, 'Questionnaire.title')[0];
    returnJson.description = fhirpath.evaluate(fhirjson, 'Questionnaire.description')[0];

    const items = fhirpath.evaluate(fhirjson, 'Questionnaire.item');

    items.forEach(item => {
        console.log(item);
    });

    return returnJson;
};

module.exports = {"ffvue": ffvue}
