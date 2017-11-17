var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("../coord/cartesian/Grid");

require("./bar/PictorialBarSeries");

require("./bar/PictorialBarView");

var barLayoutGrid = require("../layout/barGrid");

var visualSymbol = require("../visual/symbol");

require("../component/gridSimple");

// In case developer forget to include grid component
echarts.registerLayout(zrUtil.curry(barLayoutGrid, 'pictorialBar'));
echarts.registerVisual(zrUtil.curry(visualSymbol, 'pictorialBar', 'roundRect', null));