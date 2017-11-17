var echarts = require("../echarts");

require("./treemap/TreemapSeries");

require("./treemap/TreemapView");

require("./treemap/treemapAction");

var treemapVisual = require("./treemap/treemapVisual");

var treemapLayout = require("./treemap/treemapLayout");

echarts.registerVisual(treemapVisual);
echarts.registerLayout(treemapLayout);