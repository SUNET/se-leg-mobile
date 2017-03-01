module.exports.dependencies = ['UtilsFactory', 'DataFactory', 'SE_LEG_VIEWS'];

module.exports.getProcessedData = getProcessedData;

function getProcessedData() {
  var processedData;

  // getting the info we need
  var preProcessedData = {};

  // getting the id
  preProcessedData.identity = DataFactory.get(SE_LEG_VIEWS.IDENTIFICATION);
  preProcessedData.qrcode = DataFactory.get(SE_LEG_VIEWS.SCANNER);

  // transforming into querystring
  processedData = UtilsFactory.jsonToQueryString(preProcessedData);

  // replacing spaces
  processedData = processedData.replace(' ', '');

  return processedData;
}