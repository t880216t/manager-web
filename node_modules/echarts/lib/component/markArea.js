var echarts = require("../echarts");

require("./marker/MarkAreaModel");

require("./marker/MarkAreaView");

echarts.registerPreprocessor(function (opt) {
  // Make sure markArea component is enabled
  opt.markArea = opt.markArea || {};
});