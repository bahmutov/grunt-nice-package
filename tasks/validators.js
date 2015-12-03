var check = require('check-more-types');

function initValidators(grunt) {
  console.assert(grunt, 'missing grunt object');

  var is = function (type, name, value) {
    if (!check[type](value)) {
      grunt.log.error('expected', name, 'to be', type, 'not', value);
      return false;
    }
    return true;
  };

  var validators = {
    name: is.bind(null, 'string', 'name'),
    version: is.bind(null, 'string', 'version'),
    description: is.bind(null, 'string', 'description'),

    engines: function (value) {
      if (typeof value !== 'object') {
        grunt.log.error('need an object for engines property');
        return false;
      }
      if (!check.string(value.node)) {
        grunt.log.error('engines object missing node record, has ' +
          JSON.stringify(value, null, 2));
        return false;
      }
      return true;
    },

    keywords: function (values) {
      if (!check.array(values)) {
        grunt.log.error('expected keywords to be an Array');
        return false;
      }

      return values.every(function (keyword) {
        if (!check.string(keyword)) {
          grunt.log.error('every keyword should be a string, found', keyword);
          return false;
        }
        return true;
      });
    },
    author: function (value) {
      if (!check.object(value) &&
        !check.string(value)) {
        grunt.log.error('invalid author value', value);
        return false;
      }
      return true;
    },
    repository: function (value) {
      if (!check.object(value)) {
        grunt.log.error('expected repository to be an object, not', value);
        return false;
      }
      if (!check.string(value.type)) {
        grunt.log.error('expected repository type to be a string, not', value.type);
        return false;
      }
      if (!check.string(value.url)) {
        grunt.log.error('expected repository url to be a string, not', value.url);
        return false;
      }
      return true;
    }
  };
  return validators;
}

module.exports = initValidators;
