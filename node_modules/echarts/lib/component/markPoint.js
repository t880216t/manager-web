var echarts = require("../echarts");

require("./marker/MarkPointModel");

require("./marker/MarkPointView");

// HINT Markpoint can't be used too much
echarts.registerPreprocessor(function (opt) {
  // Make sure markPoint component is enabled
  opt.markPoint = opt.markPoint || {};
});