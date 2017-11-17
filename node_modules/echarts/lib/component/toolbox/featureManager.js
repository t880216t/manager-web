var features = {};

function register(name, ctor) {
  features[name] = ctor;
}

function get(name) {
  return features[name];
}

exports.register = register;
exports.get = get;