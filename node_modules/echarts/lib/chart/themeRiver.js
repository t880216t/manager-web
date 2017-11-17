var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("../component/singleAxis");

require("./themeRiver/ThemeRiverSeries");

require("./themeRiver/ThemeRiverView");

var themeRiverLayout = require("./themeRiver/themeRiverLayout");

var themeRiverVisual = require("./themeRiver/themeRiverVisual");

var dataFilter = require("../processor/dataFilter");

echarts.registerLayout(themeRiverLayout);
echarts.registerVisual(themeRiverVisual);
echarts.registerProcessor(zrUtil.curry(dataFilter, 'themeRiver'));