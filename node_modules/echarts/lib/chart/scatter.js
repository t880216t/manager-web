var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./scatter/ScatterSeries");

require("./scatter/ScatterView");

var visualSymbol = require("../visual/symbol");

var layoutPoints = require("../layout/points");

require("../component/gridSimple");

// In case developer forget to include grid component
echarts.registerVisual(zrUtil.curry(visualSymbol, 'scatter', 'circle', null));
echarts.registerLayout(zrUtil.curry(layoutPoints, 'scatter'));