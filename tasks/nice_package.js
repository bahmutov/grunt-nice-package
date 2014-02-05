/*
 * grunt-nice-package
 * https://github.com/bahmutov/grunt-nice-package
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

var PJV = require('package-json-validator').PJV;
var check = require('check-types');

function unary(fn) {
  return function (first) {
    return fn(first);
  };
}

module.exports = function(grunt) {

  var is = function (type, name, value) {
    if (!check[type](value)) {
      grunt.log.error('expected', name, 'to be', type, 'not', value);
      return false;
    }
    return true;
  };

  var defaultValidators = {
    name: is.bind(null, 'string', 'name'),
    version: is.bind(null, 'string', 'version'),
    description: is.bind(null, 'string', 'description'),

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

  grunt.registerMultiTask('nice-package', 'Opinionated package.json validator', function() {
    // Merge custom validation functions with default ones
    var options = this.options(defaultValidators);

    var pkg = grunt.file.readJSON('package.json');

    var every = Object.keys(options).every(function (key) {
      grunt.verbose.writeln('checking property', key);

      var property = pkg[key];
      if (!property) {
        grunt.log.error('package.json missing', key);
        return false;
      }
      if (typeof options[key] === 'function') {
        if (!options[key](property)) {
          grunt.log.error('failed check for property', key);
          return false;
        }
      }

      return true;
    });

    if (!every) {
      // return false;
    }

    // advanced checking
    if (!check.string(pkg.license) &&
      !check.array(pkg.licenses)) {
      grunt.log.error('missing license information');
      return false;
    }

    var result = PJV.validate(JSON.stringify(pkg, null, 2));
    if (!result.valid) {
      grunt.log.subhead('Errors:');
      result.errors.forEach(unary(grunt.log.error));
    }
    if (check.array(result.warnings) &&
      result.warnings.length) {
      grunt.log.subhead('Warnings:');
      result.warnings.forEach(unary(grunt.log.warn));
    }

    var done = this.async();
    (function runFixPack() {
      var join = require('path').join;
      var fixpack = join(__dirname, '../node_modules/fixpack');
      var exec = require('child_process').exec;

      exec('node ' + fixpack, function (error, stdout, stderr) {
        if (error) {
          grunt.log.error(error);
          done(false);
        } else {
          grunt.log.writeln(stdout);
          if (stderr) {
            grunt.log.warn(stderr);
          }
          done(!!result.valid);
        }
      });

    }());

  });

};
