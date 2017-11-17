var echarts = require("../echarts");

var zrUtil = require("zrender/lib/core/util");

var barPolar = require("../layout/barPolar");

require("../coord/polar/polarCreator");

require("./angleAxis");

require("./radiusAxis");

require("./axisPointer");

require("./axisPointer/PolarAxisPointer");

// For reducing size of echarts.min, barLayoutPolar is required by polar.
echarts.registerLayout(zrUtil.curry(barPolar, 'bar')); // Polar view

echarts.extendComponentView({
  type: 'polar'
});