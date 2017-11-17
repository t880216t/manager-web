var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

var barLayoutGrid = require("../layout/barGrid");

require("../coord/cartesian/Grid");

require("./bar/BarSeries");

require("./bar/BarView");

require("../component/gridSimple");

// In case developer forget to include grid component
echarts.registerLayout(zrUtil.curry(barLayoutGrid, 'bar')); // Visual coding for legend

echarts.registerVisual(function (ecModel) {
  ecModel.eachSeriesByType('bar', function (seriesModel) {
    var data = seriesModel.getData();
    data.setVisual('legendSymbol', 'roundRect');
  });
});