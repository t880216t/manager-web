var echarts = require("../echarts");

require("./legend/LegendModel");

require("./legend/legendAction");

require("./legend/LegendView");

var legendFilter = require("./legend/legendFilter");

var Component = require("../model/Component");

// Do not contain scrollable legend, for sake of file size.
// Series Filter
echarts.registerProcessor(legendFilter);
Component.registerSubTypeDefaulter('legend', function () {
  // Default 'plain' when no type specified.
  return 'plain';
});