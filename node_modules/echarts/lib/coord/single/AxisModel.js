var zrUtil = require("zrender/lib/core/util");

var ComponentModel = require("../../model/Component");

var axisModelCreator = require("../axisModelCreator");

var axisModelCommonMixin = require("../axisModelCommonMixin");

var AxisModel = ComponentModel.extend({
  type: 'singleAxis',
  layoutMode: 'box',

  /**
   * @type {module:echarts/coord/single/SingleAxis}
   */
  axis: null,

  /**
   * @type {module:echarts/coord/single/Single}
   */
  coordinateSystem: null,

  /**
   * @override
   */
  getCoordSysModel: function () {
    return this;
  }
});
var defaultOption = {
  left: '5%',
  top: '5%',
  right: '5%',
  bottom: '5%',
  type: 'value',
  position: 'bottom',
  orient: 'horizontal',
  axisLine: {
    show: true,
    lineStyle: {
      width: 2,
      type: 'solid'
    }
  },
  // Single coordinate system and single axis is the,
  // which is used as the parent tooltip model.
  // same model, so we set default tooltip show as true.
  tooltip: {
    show: true
  },
  axisTick: {
    show: true,
    length: 6,
    lineStyle: {
      width: 2
    }
  },
  axisLabel: {
    show: true,
    interval: 'auto'
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: 'dashed',
      opacity: 0.2
    }
  }
};

function getAxisType(axisName, option) {
  return option.type || (option.data ? 'category' : 'value');
}

zrUtil.merge(AxisModel.prototype, axisModelCommonMixin);
axisModelCreator('single', AxisModel, getAxisType, defaultOption);
var _default = AxisModel;
module.exports = _default;