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
  module.exports = fhirformResp;
