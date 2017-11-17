var zrUtil = require("zrender/lib/core/util");

function retrieveTargetInfo(payload, seriesModel) {
  if (payload && (payload.type === 'treemapZoomToNode' || payload.type === 'treemapRootToNode')) {
    var root = seriesModel.getData().tree.root;
    var targetNode = payload.targetNode;

    if (targetNode && root.contains(targetNode)) {
      return {
        node: targetNode
      };
    }

    var targetNodeId = payload.targetNodeId;

    if (targetNodeId != null && (targetNode = root.getNodeById(targetNodeId))) {
      return {
        node: targetNode
      };
    }
  }
} // Not includes the given node at the last item.


function getPathToRoot(node) {
  var path = [];

  while (node) {
    node = node.parentNode;
    node && path.push(node);
  }

  return path.reverse();
}

function aboveViewRoot(viewRoot, node) {
  var viewPath = getPathToRoot(viewRoot);
  return zrUtil.indexOf(viewPath, node) >= 0;
} // From root to the input node (the input node will be included).


function wrapTreePathInfo(node, seriesModel) {
  var treePathInfo = [];

  while (node) {
    var nodeDataIndex = node.dataIndex;
    treePathInfo.push({
      name: node.name,
      dataIndex: nodeDataIndex,
      value: seriesModel.getRawValue(nodeDataIndex)
    });
    node = node.parentNode;
  }

  treePathInfo.reverse();
  return treePathInfo;
}

exports.retrieveTargetInfo = retrieveTargetInfo;
exports.getPathToRoot = getPathToRoot;
exports.aboveViewRoot = aboveViewRoot;
exports.wrapTreePathInfo = wrapTreePathInfo;