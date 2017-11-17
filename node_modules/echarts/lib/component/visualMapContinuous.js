var echarts = require("../echarts");

var preprocessor = require("./visualMap/preprocessor");

require("./visualMap/typeDefaulter");

require("./visualMap/visualEncoding");

require("./visualMap/ContinuousModel");

require("./visualMap/ContinuousView");

require("./visualMap/visualMapAction");

/**
 * DataZoom component entry
 */
echarts.registerPreprocessor(preprocessor);