# grunt-nice-package

> Opinionated package.json validator

[![NPM info][nodei.co]](https://npmjs.org/package/grunt-nice-package)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][grunt-nice-package-devdependencies-image] ][grunt-nice-package-devdependencies-url]

## Install

```shell
npm install grunt-nice-package --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-nice-package');
grunt.initConfig({
  'nice-package': {
    all: {
      options: {
        // make sure package.json ends with \n\n, default false
        blankLine: true|false,
        version: function (value) {
          // strict version number validation
          return (/\d{1,2}\.\d{1,2}\.\d{1,2}/).test(value);
        }
      }
    }
  }
});
```

### Alternative: default options

You can load the task with default options without specifying
the configuration object

```js
grunt.loadNpmTasks('grunt-nice-package');
grunt.registerTask('default', ['nice-package']);
```

**Note:** you can use *nicePackage* as alias to *nice-package* task name

```js
 grunt.initConfig({
   nicePackage: {
     all: { ... }
   }
  });
```

### Validator functions

Please return `true` if the check passes from custom validation functions.

After the property validators pass, package.json is further checked using
[package-json-validator](http://package-json-validator.com/) by Nick Sullivan.
It will check the required properties, and provide suggestions for
the recommended ones.

## Tight versions

The fix step in this task removes all fuzzy symbols from declared versions (~, ^),
leaving just the numbers.

```
"dependencies": {         "dependencies": {
  "foo": "^0.1.0",  ==>     "foo": "0.1.0",
  "bar": "~1.0.0"           "bar": "1.0.0"
}                         }
```

## Options

You can define a validation function for any property of the *package.json*, by default
the validation will check:

* name
* version
* description
* license or licenses
* keywords (array of strings)

For complete list see
[nice_package.js](https://github.com/bahmutov/grunt-nice-package/blob/master/tasks/nice_package.js#L24) for details.

## Related projects

* [normalize-pkg](https://github.com/jonschlinkert/normalize-pkg) by
[@jonschlinkert](https://twitter.com/jonschlinkert)
* [fixpack](https://github.com/henrikjoreteg/fixpack)
* [package-json-validator](https://github.com/gorillamania/package.json-validator)

You can easily run this grunt task from gulp, 
see [Using grunt tasks from gulp](http://glebbahmutov.com/blog/using-grunt-tasks-from-gulp/)

## Small print

Author: Gleb Bahmutov &copy; 2013

* [@bahmutov](https://twitter.com/bahmutov) 
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

[ci-image]: https://travis-ci.org/bahmutov/grunt-nice-package.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/grunt-nice-package
[nodei.co]: https://nodei.co/npm/grunt-nice-package.png?downloads=true
[dependencies-image]: https://david-dm.org/bahmutov/grunt-nice-package.png
[dependencies-url]: https://david-dm.org/bahmutov/grunt-nice-package
[grunt-nice-package-devdependencies-image]: https://david-dm.org/bahmutov/grunt-nice-package/dev-status.png
[grunt-nice-package-devdependencies-url]: https://david-dm.org/bahmutov/grunt-nice-package#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
