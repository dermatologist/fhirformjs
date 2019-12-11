/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
const fhirpath = require('fhirpath');


const ffgroup = (gpjson) => {
    const returnJson = {};
    returnJson[gpjson.linkId] = {};
    returnJson[gpjson.linkId].type = "object";
    returnJson[gpjson.linkId].title = gpjson.text;
    returnJson[gpjson.linkId].properties = processItems(gpjson.item);
    // console.log(returnJson);
    return returnJson;
};

const processPart = (returnJson, item, type) => {
    returnJson[item.linkId] = {};
    returnJson[item.linkId].type = type;
    returnJson[item.linkId].title = item.text;
    return returnJson;
}

const processItems = (items) => {
    let returnJson = {};
    items.forEach(item => {
        if(item.type === "group"){
            ffgroup(item);
        }
        if(item.type === "string" || item.type === "text" || item.type === "uri"){
            returnJson = processPart(returnJson, item, "string")
        }
        if(item.type === "boolean"){
            returnJson = processPart(returnJson, item, "boolean")
        }
        if(item.type === "date"){
            returnJson = processPart(returnJson, item, "string")
            returnJson[item.linkId].format = "date";
        }
        if(item.type === "integer" || item.type === "decimal"){
            returnJson = processPart(returnJson, item, "number")
        }
    });
    console.log(returnJson)

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(returnJson)) {
        // console.log(key, value);
        this.properties[key] = value;
    }


    return returnJson;
}



const ffvue = (fhirjson) => {

    const returnJson = {};
    this.properties = {};
    returnJson.$id = fhirpath.evaluate(fhirjson, 'Questionnaire.url')[0];
    returnJson.$schema = "http://json-schema.org/draft-07/schema#";
    returnJson.title = fhirpath.evaluate(fhirjson, 'Questionnaire.title')[0] || "";
    returnJson.description = fhirpath.evaluate(fhirjson, 'Questionnaire.description')[0] || "";
    returnJson.type = "object";
    const items = fhirpath.evaluate(fhirjson, 'Questionnaire.item');
    processItems(items);
    // returnJson.properties = JSON.stringify(processItems(items));
    returnJson.properties = this.properties;
    return returnJson;
};



module.exports = {"ffvue": ffvue}
