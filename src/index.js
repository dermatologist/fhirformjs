const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;

  // let FhirContained = null;
  // if (fhirjson.contained !== undefined)
  //   FhirContained = fhirjson.contained;

  let to_return = {};
  let buff_schema = {};
  let buff_ui = {};
  let buff_data = {};
  let buff_ui_element = {};

  buff_schema.type = 'object';
  buff_schema.properties = {};

  buff_ui.type = "VerticalLayout";
  buff_ui.elements = [];

  items.forEach((item) => {


      const ItemType = item.type.toLowerCase();

      buff_schema.properties[item.linkId] = {};

      buff_ui_element = {};
      buff_ui_element.type = "Control";
      buff_ui_element.scope = "#/properties/" + item.linkId;

      if (item.text !== undefined)
          buff_ui_element.label = item.text;
      else if (item.code.code != undefined)
        buff_ui_element.label = item.code.code;


      if (ItemType === 'text') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].default = "";
            buff_schema.properties[item.linkId].minLength = 0;
            buff_schema.properties[item.linkId].maxLength = 50;
      }

      if (ItemType === 'string') {
        buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].default = "";
            buff_schema.properties[item.linkId].minLength = 0;
            buff_schema.properties[item.linkId].maxLength = 50;
      }

      if (ItemType === 'decimal') {
            buff_schema.properties[item.linkId].type = 'number';
            buff_schema.properties[item.linkId].default = 0;
            buff_schema.properties[item.linkId].minimum = 0;
            buff_schema.properties[item.linkId].maximum = 9999;
      }

      if (ItemType === 'integer') {
            buff_schema.properties[item.linkId].type = 'integer';
            buff_schema.properties[item.linkId].default = 0;
            buff_schema.properties[item.linkId].minimum = 0;
            buff_schema.properties[item.linkId].maximum = 9999;
      }

      if (ItemType === 'choice') {
            buff_schema.properties[item.linkId].type = 'string';
        buff_schema.properties[item.linkId].enum = ['one', 'two'];
      }

      if (ItemType === 'open-choice') {
            buff_schema.properties[item.linkId].type = 'string';
        buff_schema.properties[item.linkId].enum = ['one', 'two'];
      }

      if (ItemType === 'boolean') {
            buff_schema.properties[item.linkId].type = 'boolean';
            buff_schema.default = false;
      }

      if (ItemType === 'date') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].format = "date";
      }

      if (ItemType === 'dateTime') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].format = "date-time";
      }

      if (ItemType === 'dateTime') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].format = "date-time";
      }

      if (ItemType === 'time') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].format = "date-time";
      }

      if (ItemType === 'url') {
            buff_schema.properties[item.linkId].type = 'string';
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
          buff_schema.properties[item.linkId].type = 'decimal';
          buff_schema.properties[item.linkId].default = 0;
          buff_schema.properties[item.linkId].minimum = 0;
          buff_schema.properties[item.linkId].maximum = 9999;
      }


      // Process data

      if(item.answer.valueString !== undefined)
        buff_data[item.linkId] = item.answer.valueString;
      if(item.answer.valueDate !== undefined)
        buff_data[item.linkId] = item.answer.valueDate;
      if(item.answer.valueBoolean !== undefined)
        buff_data[item.linkId] = item.answer.valueBolean;
      if(item.answer.valueInteger !== undefined)
        buff_data[item.linkId] = item.answer.valueInteger;
      if(item.answer.valueChoice !== undefined)
        buff_data[item.linkId] = item.answer.valueChoice;


    buff_ui.elements.push(buff_ui_element);

  });


    to_return.schema = buff_schema;
    to_return.ui = buff_ui;
    to_return.data = buff_data;

    return to_return;
};

module.exports = { fhirformjs };
