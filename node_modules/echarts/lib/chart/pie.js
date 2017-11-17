var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./pie/PieSeries");

require("./pie/PieView");

var createDataSelectAction = require("../action/createDataSelectAction");

var dataColor = require("../visual/dataColor");

var pieLayout = require("./pie/pieLayout");

var dataFilter = require("../processor/dataFilter");

createDataSelectAction('pie', [{
  type: 'pieToggleSelect',
  event: 'pieselectchanged',
  method: 'toggleSelected'
}, {
  type: 'pieSelect',
  event: 'pieselected',
  method: 'select'
}, {
  type: 'pieUnSelect',
  event: 'pieunselected',
  method: 'unSelect'
}]);
echarts.registerVisual(zrUtil.curry(dataColor, 'pie'));
echarts.registerLayout(zrUtil.curry(pieLayout, 'pie'));
echarts.registerProcessor(zrUtil.curry(dataFilter, 'pie'));