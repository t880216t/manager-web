var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./funnel/FunnelSeries");

require("./funnel/FunnelView");

var dataColor = require("../visual/dataColor");

var funnelLayout = require("./funnel/funnelLayout");

var dataFilter = require("../processor/dataFilter");

echarts.registerVisual(zrUtil.curry(dataColor, 'funnel'));
echarts.registerLayout(funnelLayout);
echarts.registerProcessor(zrUtil.curry(dataFilter, 'funnel'));