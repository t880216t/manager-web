var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./chord/ChordSeries");

require("./chord/ChordView");

var chordCircularLayout = require("./chord/chordCircularLayout");

var dataColor = require("../visual/dataColor");

var dataFilter = require("../processor/dataFilter");

echarts.registerLayout(chordCircularLayout);
echarts.registerVisual(zrUtil.curry(dataColor, 'chord'));
echarts.registerProcessor(zrUtil.curry(dataFilter, 'pie'));