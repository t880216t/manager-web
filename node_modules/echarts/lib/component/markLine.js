var echarts = require("../echarts");

require("./marker/MarkLineModel");

require("./marker/MarkLineView");

echarts.registerPreprocessor(function (opt) {
  // Make sure markLine component is enabled
  opt.markLine = opt.markLine || {};
});