# grunt-nice-package

> Opinionated package.json validator

[![NPM info][nodei.co]](https://npmjs.org/package/grunt-nice-package)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![endorse][endorse-image]][endorse-url]

## Install

```shell
npm install grunt-nice-package --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nice-package');
grunt.initConfig({
  all: {
    options: {
      version: function (value) {
        // strict version number validation
        return (/\d{1,2}\.\d{1,2}\.\d{1,2}/).test(value);
      }
    }
  }
})
```

## Options

You can define a validation function for any property of the *package.json*, by default
the validation will check:

* name
* version
* description
* license or licenses

For complete list see
[nice_package.js](https://github.com/bahmutov/grunt-nice-package/blob/master/tasks/nice_package.js#24) for details.

## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[ci-image]: https://travis-ci.org/bahmutov/grunt-nice-package.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/grunt-nice-package
[nodei.co]: https://nodei.co/npm/grunt-nice-package.png?downloads=true
[dependencies-image]: https://david-dm.org/bahmutov/grunt-nice-package.png
[dependencies-url]: https://david-dm.org/bahmutov/grunt-nice-package
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
