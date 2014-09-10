var path = require('path');
var check = require('check-types');
var glob = require('glob');

gt.module('glob.sync');

gt.test('getting all js files in the current folder', function () {
  var files = glob.sync(__dirname + '/*.js');
  gt.ok(files.length > 0, 'grabbed files');
  // console.log('current file', __filename);
  gt.ok(files.indexOf(__filename) !== -1,
    'list of js files has current file');
});

gt.module('use nice-package name', {
  setup: function () {
    process.chdir(path.join(__dirname, 'nice-package'));
  },
  teardown: function () {
    process.chdir(__dirname);
  }
});

gt.async('nice-package task name', function () {
  gt.exec('grunt', ['--no-quiet'], 0, function (stdout) {
    gt.ok(check.unemptyString(stdout), 'missing stdout');
    gt.ok(/running\ grunt/.test(stdout), 'running grunt');
    gt.ok(/version\ 0\.0\.0/.test(stdout), 'checked version');
  });
});

gt.module('use nicePackage task name', {
  setup: function () {
    process.chdir(path.join(__dirname, 'nicePackage'));
  },
  teardown: function () {
    process.chdir(__dirname);
  }
});

gt.async('nicePackage task name', function () {
  gt.exec('grunt', ['--no-quiet'], 0, function (stdout) {
    gt.ok(check.unemptyString(stdout), 'missing stdout');
    gt.ok(/running\ grunt/.test(stdout), 'running grunt');
    gt.ok(/version\ 0\.0\.0/.test(stdout), 'checked version');
  });
});

gt.module('warn on loose versions', {
  setup: function () {
    process.chdir(path.join(__dirname, 'looseVersionWarnings'));
  },
  teardown: function () {
    process.chdir(__dirname);
  }
});

gt.async('warn on * in version', function () {
  gt.exec('grunt', ['--no-quiet'], 0, function (stdout) {
    gt.ok(check.unemptyString(stdout), 'missing stdout');
    gt.ok(/running\ grunt/.test(stdout), 'running grunt');
    gt.ok(/version\ 0\.0\.0/.test(stdout), 'checked version');
    gt.ok(/loose version/.test(stdout), 'warned about loose version');
  });
});

gt.module('readme filename', {
  setup: function () {
    process.chdir(path.join(__dirname, 'readme'));
  },
  teardown: function () {
    process.chdir(__dirname);
  }
});

gt.async('readme filename', function () {
  gt.exec('grunt', ['--no-quiet'], 0);
});
