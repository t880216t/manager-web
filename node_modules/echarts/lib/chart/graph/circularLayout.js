var _circularLayoutHelper = require("./circularLayoutHelper");

var circularLayout = _circularLayoutHelper.circularLayout;

function _default(ecModel) {
  ecModel.eachSeriesByType('graph', function (seriesModel) {
    if (seriesModel.get('layout') === 'circular') {
      circularLayout(seriesModel);
    }
  });
}

module.exports = _default;