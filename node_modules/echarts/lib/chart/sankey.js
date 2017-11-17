var echarts = require("../echarts");

require("./sankey/SankeySeries");

require("./sankey/SankeyView");

var sankeyLayout = require("./sankey/sankeyLayout");

var sankeyVisual = require("./sankey/sankeyVisual");

echarts.registerLayout(sankeyLayout);
echarts.registerVisual(sankeyVisual);