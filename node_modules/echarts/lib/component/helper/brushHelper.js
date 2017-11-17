var BoundingRect = require("zrender/lib/core/BoundingRect");

var _cursorHelper = require("./cursorHelper");

var onIrrelevantElement = _cursorHelper.onIrrelevantElement;

var graphicUtil = require("../../util/graphic");

function makeRectPanelClipPath(rect) {
  rect = normalizeRect(rect);
  return function (localPoints, transform) {
    return graphicUtil.clipPointsByRect(localPoints, rect);
  };
}

function makeLinearBrushOtherExtent(rect, specifiedXYIndex) {
  rect = normalizeRect(rect);
  return function (xyIndex) {
    var idx = specifiedXYIndex != null ? specifiedXYIndex : xyIndex;
    var brushWidth = idx ? rect.width : rect.height;
    var base = idx ? rect.x : rect.y;
    return [base, base + (brushWidth || 0)];
  };
}

function makeRectIsTargetByCursor(rect, api, targetModel) {
  rect = normalizeRect(rect);
  return function (e, localCursorPoint, transform) {
    return rect.contain(localCursorPoint[0], localCursorPoint[1]) && !onIrrelevantElement(e, api, targetModel);
  };
} // Consider width/height is negative.


function normalizeRect(rect) {
  return BoundingRect.create(rect);
}

exports.makeRectPanelClipPath = makeRectPanelClipPath;
exports.makeLinearBrushOtherExtent = makeLinearBrushOtherExtent;
exports.makeRectIsTargetByCursor = makeRectIsTargetByCursor;