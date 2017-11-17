var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./effectScatter/EffectScatterSeries");

require("./effectScatter/EffectScatterView");

var visualSymbol = require("../visual/symbol");

var layoutPoints = require("../layout/points");

echarts.registerVisual(zrUtil.curry(visualSymbol, 'effectScatter', 'circle', null));
echarts.registerLayout(zrUtil.curry(layoutPoints, 'effectScatter'));