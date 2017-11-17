var echarts = require("../echarts");

require("./boxplot/BoxplotSeries");

require("./boxplot/BoxplotView");

var boxplotVisual = require("./boxplot/boxplotVisual");

var boxplotLayout = require("./boxplot/boxplotLayout");

echarts.registerVisual(boxplotVisual);
echarts.registerLayout(boxplotLayout);