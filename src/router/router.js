var p = require('pun');
var _ = p._;
var $ = p.$;
var homepage = require('./homepage')
var route = p.match(
  ["",""], homepage,
  [$('username'),$('gistid')], rungist,
  _, 404page
  )
