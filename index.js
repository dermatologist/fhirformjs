const fhirformjs = (fhirjson) => {
  // Your code goes here
  const items = fhirjson.item;
  let buff = null;
  const toReturn = [];

  items.forEach((item) => {
    buff = item;
    buff.title = item.text;
    if (item.type === 'text')
      buff.type = 'string';
    if (item.type === 'open-choice')
      buff.type = 'string';
    toReturn.push(buff)
  })

  return toReturn;
};

module.exports={fhirformjs};
