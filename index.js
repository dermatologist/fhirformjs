const fhirformjs = (fhirjson) => {
    // Your code goes here
    const items = fhirjson.item;
    const resources = fhirjson.contained;
    let buff = null;
    const toReturn = [];

    items.forEach((item) => {
        buff = item;
        buff.title = item.text;
        buff.id = item.linkId;
        buff.system = item.code.system;
        buff.code = item.code.code;
        buff.options = item.options.reference;
        const item_type = item.type.toLowerCase();
        if (item_type === 'string')
            buff.type = 'string';
        if (item_type === 'number')
            buff.type = 'number';
        if (item_type === 'choice')
            buff.type = 'string';
        if (item_type === 'boolean')
            buff.type = 'boolean';
        if (item_type === 'date')
            buff.type = 'string';
        if (item_type === 'group')
            buff.type = 'string';
        toReturn.push(buff)
    })


    return toReturn;
};

module.exports = { fhirformjs };
