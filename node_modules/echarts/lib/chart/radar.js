var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("../component/radar");

require("./radar/RadarSeries");

require("./radar/RadarView");

var dataColor = require("../visual/dataColor");

var visualSymbol = require("../visual/symbol");

var radarLayout = require("./radar/radarLayout");

var dataFilter = require("../processor/dataFilter");

var backwardCompat = require("./radar/backwardCompat");

// Must use radar component
echarts.registerVisual(zrUtil.curry(dataColor, 'radar'));
echarts.registerVisual(zrUtil.curry(visualSymbol, 'radar', 'circle', null));
echarts.registerLayout(radarLayout);
echarts.registerProcessor(zrUtil.curry(dataFilter, 'radar'));
echarts.registerPreprocessor(backwardCompat);