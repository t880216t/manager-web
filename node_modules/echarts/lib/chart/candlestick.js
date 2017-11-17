var echarts = require("../echarts");

require("./candlestick/CandlestickSeries");

require("./candlestick/CandlestickView");

var preprocessor = require("./candlestick/preprocessor");

var candlestickVisual = require("./candlestick/candlestickVisual");

var candlestickLayout = require("./candlestick/candlestickLayout");

echarts.registerPreprocessor(preprocessor);
echarts.registerVisual(candlestickVisual);
echarts.registerLayout(candlestickLayout);