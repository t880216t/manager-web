var echarts = require("../../echarts");

var ATTR = '\0_ec_interaction_mutex';

function take(zr, resourceKey, userKey) {
  var store = getStore(zr);
  store[resourceKey] = userKey;
}

function release(zr, resourceKey, userKey) {
  var store = getStore(zr);
  var uKey = store[resourceKey];

  if (uKey === userKey) {
    store[resourceKey] = null;
  }
}

function isTaken(zr, resourceKey) {
  return !!getStore(zr)[resourceKey];
}

function getStore(zr) {
  return zr[ATTR] || (zr[ATTR] = {});
}
/**
 * payload: {
 *     type: 'takeGlobalCursor',
 *     key: 'dataZoomSelect', or 'brush', or ...,
 *         If no userKey, release global cursor.
 * }
 */


echarts.registerAction({
  type: 'takeGlobalCursor',
  event: 'globalCursorTaken',
  update: 'update'
}, function () {});
exports.take = take;
exports.release = release;
exports.isTaken = isTaken;