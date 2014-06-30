var path = require('path');
var check = require('check-types');

gt.module('use nicePackage name', {
  setup: function () {
    process.chdir(path.join(__dirname, 'nice-package'));
  },
  teardown: function () {
    process.chdir(__dirname);
  }
});

gt.async('nice-package task name', function () {
  console.log('current dir', process.cwd());
  gt.exec('grunt', ['--no-quiet'], 0, function (stdout) {
    gt.ok(check.unemptyString(stdout), 'missing stdout');
    gt.ok(/running\ grunt/.test(stdout), 'running grunt');
    gt.ok(/version\ 0\.0\.0/.test(stdout), 'checked version');
  });
});
