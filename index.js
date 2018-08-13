const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;
    const resources = fhirjson.contained;
    let buff = null;
    const toReturn = [];

    items.forEach((item) => {
        buff = item;
        buff.title = item.text;
        buff.description = "";
        buff.$id = item.linkId;
        buff.system = item.code.system;
        buff.code = item.code.code;
        buff.options = item.options.reference;
        const item_type = item.type.toLowerCase();
        if (item_type === 'string') {
            buff.type = 'string';
            buff.default = '';
            buff.minLength = 0;
            buff.maxLength = 9999;
        }
        if (item_type === 'number') {
            buff.type = 'number';
            buff.default = 0;
            buff.minimum = 0;
            buff.maximum = 9999;
        }
        if (item_type === 'choice') {
            buff.type = 'string';
            buff.enum = [];
        }
        if (item_type === 'boolean') {
            buff.type = 'boolean';
            buff.default = false;
        }
        if (item_type === 'date') {
            buff.type = 'string';
            buff.format = "date-time";
        }
        if (item_type === 'group')
            buff.type = 'string';
        toReturn.push(buff)
    })


    return toReturn;
};

module.exports = { fhirformjs };
