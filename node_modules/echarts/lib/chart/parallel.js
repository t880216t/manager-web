var echarts = require("../echarts");

require("../component/parallel");

require("./parallel/ParallelSeries");

require("./parallel/ParallelView");

var parallelVisual = require("./parallel/parallelVisual");

echarts.registerVisual(parallelVisual);