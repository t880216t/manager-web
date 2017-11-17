var zrender = require("zrender/lib/zrender");

exports.zrender = zrender;

var matrix = require("zrender/lib/core/matrix");

exports.matrix = matrix;

var vector = require("zrender/lib/core/vector");

exports.vector = vector;

var zrUtil = require("zrender/lib/core/util");

var colorTool = require("zrender/lib/tool/color");

exports.color = colorTool;

var graphic = require("./util/graphic");

exports.graphic = graphic;

var numberUtil = require("./util/number");

exports.number = numberUtil;

var formatUtil = require("./util/format");

exports.format = formatUtil;

var _throttle = require("./util/throttle");

var throttle = _throttle.throttle;
exports.throttle = _throttle.throttle;

var ecHelper = require("./helper");

exports.helper = ecHelper;

var _List = require("./data/List");

exports.List = _List;

var _Model = require("./model/Model");

exports.Model = _Model;

var _Axis = require("./coord/Axis");

exports.Axis = _Axis;

var _env = require("zrender/lib/core/env");

exports.env = _env;

var _parseGeoJson = require("./coord/geo/parseGeoJson");

exports.parseGeoJson = _parseGeoJson;

/**
 * Do not mount those modules on 'src/echarts' for better tree shaking.
 */
var ecUtil = {};
zrUtil.each(['map', 'each', 'filter', 'indexOf', 'inherits', 'reduce', 'filter', 'bind', 'curry', 'isArray', 'isString', 'isObject', 'isFunction', 'extend', 'defaults', 'clone', 'merge'], function (name) {
  ecUtil[name] = zrUtil[name];
});
exports.util = ecUtil;