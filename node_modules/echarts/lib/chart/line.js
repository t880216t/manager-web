var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./line/LineSeries");

require("./line/LineView");

var visualSymbol = require("../visual/symbol");

var layoutPoints = require("../layout/points");

var dataSample = require("../processor/dataSample");

require("../component/gridSimple");

// In case developer forget to include grid component
echarts.registerVisual(zrUtil.curry(visualSymbol, 'line', 'circle', 'line'));
echarts.registerLayout(zrUtil.curry(layoutPoints, 'line')); // Down sample after filter

echarts.registerProcessor(echarts.PRIORITY.PROCESSOR.STATISTIC, zrUtil.curry(dataSample, 'line'));