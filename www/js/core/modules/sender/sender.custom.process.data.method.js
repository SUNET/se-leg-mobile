/**
 * SE-LEG strategy to process data.
 *
 */
var processedData = '';

//
var savedData = DataFactory.getAll();

// getting the info we need
var preProcessedData = {};
// getting the id
preProcessedData.identity = savedData[SE_LEG_VIEWS.ID];
preProcessedData.qrcode = savedData[SE_LEG_VIEWS.SCANNER];

// transforming into querystring
processedData = UtilsFactory.jsonToQueryString(preProcessedData);

// replacing spaces
processedData = processedData.split(' ').join('');

return processedData;