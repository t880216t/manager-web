var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

require("./graph/GraphSeries");

require("./graph/GraphView");

require("./graph/graphAction");

var categoryFilter = require("./graph/categoryFilter");

var visualSymbol = require("../visual/symbol");

var categoryVisual = require("./graph/categoryVisual");

var edgeVisual = require("./graph/edgeVisual");

var simpleLayout = require("./graph/simpleLayout");

var circularLayout = require("./graph/circularLayout");

var forceLayout = require("./graph/forceLayout");

var createView = require("./graph/createView");

echarts.registerProcessor(categoryFilter);
echarts.registerVisual(zrUtil.curry(visualSymbol, 'graph', 'circle', null));
echarts.registerVisual(categoryVisual);
echarts.registerVisual(edgeVisual);
echarts.registerLayout(simpleLayout);
echarts.registerLayout(circularLayout);
echarts.registerLayout(forceLayout); // Graph view coordinate system

echarts.registerCoordinateSystem('graphView', {
  create: createView
});