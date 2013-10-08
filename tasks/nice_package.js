/*
 * grunt-nice-package
 * https://github.com/bahmutov/grunt-nice-package
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

var PJV = require('package-json-validator');
var check = require('check-types');

module.exports = function(grunt) {

  var is = function (type, name, value) {
    if (!check['is' + type](value)) {
      grunt.log.error('expected', name, 'to be', type, 'not', value);
      return false;
    }
    return true;
  };

  grunt.registerMultiTask('nice_package', 'Opinionated package.json validator', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      name: is.bind(null, 'String', 'name'),
      version: is.bind(null, 'String', 'version'),
      description: is.bind(null, 'String', 'description')
    });

    var pkg = grunt.file.readJSON('package.json');

    var every = Object.keys(options).every(function (key) {
      grunt.verbose.writeln('checking property', key);

      var property = pkg[key];
      if (!property) {
        grunt.log.error('package.json missing', key);
        return false;
      }
      if (typeof options[key] === 'function') {
        return options[key](property);
      }

      return true;
    });

    if (!every) {
      return false;
    }

    return true;
  });

};
