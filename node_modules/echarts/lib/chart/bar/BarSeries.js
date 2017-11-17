var BaseBarSeries = require("./BaseBarSeries");

var _default = BaseBarSeries.extend({
  type: 'series.bar',
  dependencies: ['grid', 'polar'],
  brushSelector: 'rect'
});

module.exports = _default;