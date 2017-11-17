var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./tree/TreeSeries");

require("./tree/TreeView");

require("./tree/treeAction");

var visualSymbol = require("../visual/symbol");

var orthogonalLayout = require("./tree/orthogonalLayout");

var radialLayout = require("./tree/radialLayout");

echarts.registerVisual(zrUtil.curry(visualSymbol, 'tree', 'circle', null));
echarts.registerLayout(orthogonalLayout);
echarts.registerLayout(radialLayout);