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
    const itemLinkId = item.linkId.replace(/\./g, '___');

    buffSchema.properties[itemLinkId] = {};

    buffUiElement = {};
    buffUiElement.type = 'Control';
    buffUiElement.scope = '#/properties/' + itemLinkId;

      if (item.text !== undefined)
        buffUiElement.label = item.text;
      else if (item.code.display != undefined)
        buffUiElement.label = item.code.display;
      else if (item.code.code != undefined)
        buffUiElement.label = item.code.code;

      if (ItemType === 'text') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].default = '';
        buffSchema.properties[itemLinkId].minLength = 0;
        buffSchema.properties[itemLinkId].maxLength = 50;
      }

      if (ItemType === 'string') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].default = '';
        buffSchema.properties[itemLinkId].minLength = 0;
        buffSchema.properties[itemLinkId].maxLength = 50;
      }

      if (ItemType === 'decimal') {
        buffSchema.properties[itemLinkId].type = 'number';
        buffSchema.properties[itemLinkId].default = 0;
        buffSchema.properties[itemLinkId].minimum = 0;
        buffSchema.properties[itemLinkId].maximum = 9999;
      }

      if (ItemType === 'integer') {
        buffSchema.properties[itemLinkId].type = 'integer';
        buffSchema.properties[itemLinkId].default = 0;
        buffSchema.properties[itemLinkId].minimum = 0;
        buffSchema.properties[itemLinkId].maximum = 9999;
      }

      if (ItemType === 'choice') {
        buffSchema.properties[itemLinkId].type = 'string';
        let _enum = [];
        if(item.option !== undefined){
          item.option.forEach(element => {
            if(element.valueCoding !== undefined && element.valueCoding.code !== undefined)
              _enum.push(element.valueCoding.code);
          });
        }
        if (_enum === undefined || _enum.length == 0) {
          // array empty or does not exist
          buffSchema.properties[itemLinkId].enum = ['one', 'two'];
        }else{
          buffSchema.properties[itemLinkId].enum = _enum;
        }
      }

      if (ItemType === 'open-choice') {
        buffSchema.properties[itemLinkId].type = 'checkboxes';
        buffSchema.properties[itemLinkId].titleMap = {};
        buffSchema.properties[itemLinkId].titleMap.one = "one";
        buffSchema.properties[itemLinkId].titleMap.two = "two";
        buffSchema.properties[itemLinkId].titleMap.otherField = {};
        buffSchema.properties[itemLinkId].titleMap.otherField.key = "menu2Other";
        buffSchema.properties[itemLinkId].titleMap.otherField.title = "Custom other field title";
        buffSchema.properties[itemLinkId].titleMap.otherField.otherValue = "CUSTOME_OTHER_VALUE";

      }

      if (ItemType === 'boolean') {
        buffSchema.properties[itemLinkId].type = 'boolean';
        buffSchema.default = false;
      }

      if (ItemType === 'date') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].format = 'date';
      }

      if (ItemType === 'dateTime') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].format = 'date-time';
      }

      if (ItemType === 'dateTime') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].format = 'date-time';
      }

      if (ItemType === 'time') {
        buffSchema.properties[itemLinkId].type = 'string';
        buffSchema.properties[itemLinkId].format = 'date-time';
      }

      if (ItemType === 'url') {
        buffSchema.properties[itemLinkId].type = 'string';
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
        buffSchema.properties[itemLinkId].type = 'decimal';
        buffSchema.properties[itemLinkId].default = 0;
        buffSchema.properties[itemLinkId].minimum = 0;
        buffSchema.properties[itemLinkId].maximum = 9999;
      }


      // Process data
    if (item.answer !== undefined) {
      if (item.answer.valueString !== undefined)
        buffData[itemLinkId] = item.answer.valueString;
      if (item.answer.valueDate !== undefined)
        buffData[itemLinkId] = item.answer.valueDate;
      if (item.answer.valueBoolean !== undefined)
        buffData[itemLinkId] = item.answer.valueBoolean;
      if (item.answer.valueInteger !== undefined)
        buffData[itemLinkId] = item.answer.valueInteger;
      if (item.answer.valueChoice !== undefined)
        buffData[itemLinkId] = item.answer.valueChoice;
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
    const itemLinkId = item.linkId.replace(/\./g, '___');

      if (ItemType === 'string') {
        item.answer = {};
        item.answer.valueString = resp[itemLinkId];
      }

      if (ItemType === 'text') {
        item.answer = {};
        item.answer.valueString = resp[itemLinkId];
      }

      if (ItemType === 'integer') {
        item.answer = {};
        item.answer.valueInteger = resp[itemLinkId];
      }

      if (ItemType === 'date') {
        item.answer = {};
        item.answer.valueDate = resp[itemLinkId];
      }
      if (ItemType === 'boolean') {
        item.answer = {};
        item.answer.valueBoolean = resp[itemLinkId];
      }
      if (ItemType === 'choice') {
        item.answer = {};
        item.answer.valueChoice = resp[itemLinkId];
      }
  });

  fhirjson.item = items;

  return fhirjson;

};
module.exports = { fhirformjs, fhirformResp };
