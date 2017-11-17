var echarts = require("../echarts");

require("./map/MapSeries");

require("./map/MapView");

require("../action/geoRoam");

require("../coord/geo/geoCreator");

var mapSymbolLayout = require("./map/mapSymbolLayout");

var mapVisual = require("./map/mapVisual");

var mapDataStatistic = require("./map/mapDataStatistic");

var backwardCompat = require("./map/backwardCompat");

var createDataSelectAction = require("../action/createDataSelectAction");

echarts.registerLayout(mapSymbolLayout);
echarts.registerVisual(mapVisual);
echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, mapDataStatistic);
echarts.registerPreprocessor(backwardCompat);
createDataSelectAction('map', [{
  type: 'mapToggleSelect',
  event: 'mapselectchanged',
  method: 'toggleSelected'
}, {
  type: 'mapSelect',
  event: 'mapselected',
  method: 'select'
}, {
  type: 'mapUnSelect',
  event: 'mapunselected',
  method: 'unSelect'
}]);