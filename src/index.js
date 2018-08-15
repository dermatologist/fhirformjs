const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;

  // let FhirContained = null;
  // if (fhirjson.contained !== undefined)
  //   FhirContained = fhirjson.contained;

    let to_return = {};
    let buff_schema = {};
    let buff_ui = {};

    items.forEach((item) => {

      buff_schema.type = "object";

      const ItemType = item.type.toLowerCase();


      if (ItemType === 'text') {
            buff_schema.properties[item.linkId].type = "string"
            buff_schema.properties[item.linkId].default = "";
            buff_schema.properties[item.linkId].minLength = 0;
            buff_schema.properties[item.linkId].maxLength = 9999;
      }

      if (ItemType === 'string') {
            buff_schema.properties[item.linkId].type = "string"
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
            buff_schema.properties[item.linkId].enum = [];
      }
      
      if (ItemType === 'open-choice') {
            buff_schema.properties[item.linkId].type = 'string';
            buff_schema.properties[item.linkId].enum = [];
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

    });

    to_return.schema = buff_schema;
    to_return.ui = buff_ui;

    return to_return;
};

module.exports = { fhirformjs };
