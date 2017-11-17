var echarts = require("../echarts");

var preprocessor = require("./brush/preprocessor");

require("./brush/visualEncoding");

require("./brush/BrushModel");

require("./brush/BrushView");

require("./brush/brushAction");

require("./toolbox/feature/Brush");

/**
 * Brush component entry
 */
echarts.registerPreprocessor(preprocessor);