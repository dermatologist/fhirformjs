const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;

  // let FhirContained = null;
  // if (fhirjson.contained !== undefined)
  //   FhirContained = fhirjson.contained;

    let buff = null;
    const toReturn = [];

    items.forEach((item) => {
      if (item !== undefined)
        buff = item;
      if (item.text !== undefined)
        buff.title = item.text;

        buff.description = "";

      if (item.linkId !== undefined)
        buff.$id = item.linkId;

      if (item !== undefined && item.code !== undefined && item.code.system !== undefined)
        buff.system = item.code.system;
      if (item !== undefined && item.code !== undefined && item.code.code !== undefined)
        buff.code = item.code.code;
      if (item !== undefined && item.options !== undefined && item.options.reference !== undefined)
        buff.options = item.options.reference;

      const ItemType = item.type.toLowerCase();


      if (ItemType === 'text') {
        buff.type = 'string';
        buff.default = '';
        buff.minLength = 0;
        buff.maxLength = 9999;
      }
      if (ItemType === 'string') {
            buff.type = 'string';
            buff.default = '';
            buff.minLength = 0;
            buff.maxLength = 9999;
        }

      if (ItemType === 'number') {
            buff.type = 'number';
            buff.default = 0;
            buff.minimum = 0;
            buff.maximum = 9999;
        }
      if (ItemType === 'choice') {
            buff.type = 'string';
            buff.enum = [];
        }
      if (ItemType === 'boolean') {
            buff.type = 'boolean';
            buff.default = false;
        }
      if (ItemType === 'date') {
            buff.type = 'string';
            buff.format = "date-time";
        }
      if (ItemType === 'group')
            buff.type = 'string';
        toReturn.push(buff)
    });


    return toReturn;
};

module.exports = { fhirformjs };
