var echarts = require("../echarts");

require("../coord/single/singleCreator");

require("./axis/SingleAxisView");

require("../coord/single/AxisModel");

require("./axisPointer");

require("./axisPointer/SingleAxisPointer");

echarts.extendComponentView({
  type: 'single'
});