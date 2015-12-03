var verify = require('check-more-types').verify;

function unary(fn) {
  verify.fn(fn, 'unary expects a function');
  return function (first) {
    return fn(first);
  };
}

function find(array, cb) {
  verify.array(array, 'expected array');
  verify.fn(cb, 'expected callback');

  var found;
  array.some(function (item) {
    if (cb(item)) {
      found = item;
      return true;
    }
  });
  return found;
}

module.exports = {
  unary: unary,
  find: find
};
