var echarts = require("../echarts");

var preprocessor = require("./timeline/preprocessor");

require("./timeline/typeDefaulter");

require("./timeline/timelineAction");

require("./timeline/SliderTimelineModel");

require("./timeline/SliderTimelineView");

/**
 * DataZoom component entry
 */
echarts.registerPreprocessor(preprocessor);