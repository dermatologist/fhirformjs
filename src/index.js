const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;

  // let FhirContained = null;
  // if (fhirjson.contained !== undefined)
  //   FhirContained = fhirjson.contained;

  const toReturn = {};
  const buffSchema = {};
  const buffUi = {};
  const buffData = {};
  let buffUiElement = {};

  buffSchema.type = 'object';
  buffSchema.properties = {};

  buffUi.type = 'VerticalLayout';
  buffUi.elements = [];

  items.forEach((item) => {


      const ItemType = item.type.toLowerCase();

    buffSchema.properties[item.linkId] = {};

    buffUiElement = {};
    buffUiElement.type = 'Control';
    buffUiElement.scope = '#/properties/' + item.linkId;

      if (item.text !== undefined)
        buffUiElement.label = item.text;
      else if (item.code.code != undefined)
        buffUiElement.label = item.code.code;


      if (ItemType === 'text') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].default = '';
        buffSchema.properties[item.linkId].minLength = 0;
        buffSchema.properties[item.linkId].maxLength = 50;
      }

      if (ItemType === 'string') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].default = '';
        buffSchema.properties[item.linkId].minLength = 0;
        buffSchema.properties[item.linkId].maxLength = 50;
      }

      if (ItemType === 'decimal') {
        buffSchema.properties[item.linkId].type = 'number';
        buffSchema.properties[item.linkId].default = 0;
        buffSchema.properties[item.linkId].minimum = 0;
        buffSchema.properties[item.linkId].maximum = 9999;
      }

      if (ItemType === 'integer') {
        buffSchema.properties[item.linkId].type = 'integer';
        buffSchema.properties[item.linkId].default = 0;
        buffSchema.properties[item.linkId].minimum = 0;
        buffSchema.properties[item.linkId].maximum = 9999;
      }

      if (ItemType === 'choice') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].enum = ['one', 'two'];
      }

      if (ItemType === 'open-choice') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].enum = ['one', 'two'];
      }

      if (ItemType === 'boolean') {
        buffSchema.properties[item.linkId].type = 'boolean';
        buffSchema.default = false;
      }

      if (ItemType === 'date') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].format = 'date';
      }

      if (ItemType === 'dateTime') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].format = 'date-time';
      }

      if (ItemType === 'dateTime') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].format = 'date-time';
      }

      if (ItemType === 'time') {
        buffSchema.properties[item.linkId].type = 'string';
        buffSchema.properties[item.linkId].format = 'date-time';
      }

      if (ItemType === 'url') {
        buffSchema.properties[item.linkId].type = 'string';
      }

      if (ItemType === 'group'){

      }

      if (ItemType === 'display'){

      }
      if (ItemType === 'attachment'){

      }
      if (ItemType === 'reference'){

      }

      if (ItemType === 'quantity'){
        buffSchema.properties[item.linkId].type = 'decimal';
        buffSchema.properties[item.linkId].default = 0;
        buffSchema.properties[item.linkId].minimum = 0;
        buffSchema.properties[item.linkId].maximum = 9999;
      }


      // Process data
    if (item.answer !== undefined) {
      if (item.answer.valueString !== undefined)
        buffData[item.linkId] = item.answer.valueString;
      if (item.answer.valueDate !== undefined)
        buffData[item.linkId] = item.answer.valueDate;
      if (item.answer.valueBoolean !== undefined)
        buffData[item.linkId] = item.answer.valueBoolean;
      if (item.answer.valueInteger !== undefined)
        buffData[item.linkId] = item.answer.valueInteger;
      if (item.answer.valueChoice !== undefined)
        buffData[item.linkId] = item.answer.valueChoice;
    }

    buffUi.elements.push(buffUiElement);

  });


  toReturn.schema = buffSchema;
  toReturn.ui = buffUi;
  toReturn.data = buffData;

  return toReturn;
};

const fhirformResp = (fhirjson, resp) => {

  const items = fhirjson.item;

  items.forEach((item) => {
      const ItemType = item.type.toLowerCase();

      if (ItemType === 'string') {
        item.answer = {};
        item.answer.valueString = resp[item.linkId];
      }

      if (ItemType === 'text') {
        item.answer = {};
        item.answer.valueString = resp[item.linkId];
      }

      if (ItemType === 'integer') {
        item.answer = {};
        item.answer.valueInteger = resp[item.linkId];
      }

      if (ItemType === 'date') {
        item.answer = {};
        item.answer.valueDate = resp[item.linkId];
      }
      if (ItemType === 'boolean') {
        item.answer = {};
        item.answer.valueBoolean = resp[item.linkId];
      }
      if (ItemType === 'choice') {
        item.answer = {};
        item.answer.valueChoice = resp[item.linkId];
      }
  });

  fhirjson.item = items;

  return fhirjson;

};
module.exports = { fhirformjs, fhirformResp };
