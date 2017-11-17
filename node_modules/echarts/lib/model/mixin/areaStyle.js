var makeStyleMapper = require("./makeStyleMapper");

var getAreaStyle = makeStyleMapper([['fill', 'color'], ['shadowBlur'], ['shadowOffsetX'], ['shadowOffsetY'], ['opacity'], ['shadowColor']]);
var _default = {
  getAreaStyle: function (excludes, includes) {
    return getAreaStyle(this, excludes, includes);
  }
};
module.exports = _default;