var pun = require('pun');
var _ = pun._;
var $ = pun.$;
var homepage = require('./homepage');
var rungist = require('./rungist');
var route = pun.match(
  [""], homepage,
  [$('username'),$('gistid')], rungist,
  _, homepage
);
module.exports = route;
