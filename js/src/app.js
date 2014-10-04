var route = require('./router/router');
var path = window.location.hash.replace('#','');
var r = require('ramda');
if (process.env.NODE_ENV === "production") {
	path = window.location.pathname;
}
var pathArray = r.reject((x)=>x==="", path.split('/'));
route(pathArray);










