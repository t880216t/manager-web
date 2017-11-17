var echarts = require("../echarts");

require("./lines/LinesSeries");

require("./lines/LinesView");

var linesLayout = require("./lines/linesLayout");

var linesVisual = require("./lines/linesVisual");

echarts.registerLayout(linesLayout);
echarts.registerVisual(linesVisual);