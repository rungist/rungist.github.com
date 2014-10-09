var pun = require('pun');
var _ = pun._;
var $ = pun.$;
var homepage = require('./homepage');
var rungist = require('./rungist');
var route = pun.match(
  [$('username'),$('gistid')], rungist,
  _, function(hehe){console.log(hehe)}
);
module.exports = route;
