var commonLayout = require("./commonLayout");

function _default(ecModel, api) {
  ecModel.eachSeriesByType('tree', function (seriesModel) {
    commonLayout(seriesModel, api);
  });
}

module.exports = _default;