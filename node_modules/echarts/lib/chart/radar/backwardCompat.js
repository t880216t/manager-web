var zrUtil = require("zrender/lib/core/util");

// Backward compat for radar chart in 2
function _default(option) {
  var polarOptArr = option.polar;

  if (polarOptArr) {
    if (!zrUtil.isArray(polarOptArr)) {
      polarOptArr = [polarOptArr];
    }

    var polarNotRadar = [];
    zrUtil.each(polarOptArr, function (polarOpt, idx) {
      if (polarOpt.indicator) {
        if (polarOpt.type && !polarOpt.shape) {
          polarOpt.shape = polarOpt.type;
        }

        option.radar = option.radar || [];

        if (!zrUtil.isArray(option.radar)) {
          option.radar = [option.radar];
        }

        option.radar.push(polarOpt);
      } else {
        polarNotRadar.push(polarOpt);
      }
    });
    option.polar = polarNotRadar;
  }

  zrUtil.each(option.series, function (seriesOpt) {
    if (seriesOpt && seriesOpt.type === 'radar' && seriesOpt.polarIndex) {
      seriesOpt.radarIndex = seriesOpt.polarIndex;
    }
  });
}

module.exports = _default;