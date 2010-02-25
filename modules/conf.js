var fs = require('fs'),
sys    = require('sys'),

reg    = /([a-z0-9_-]+)\.json/i,
conf   = {};


//we are going to load all the conf files in conf/ synchronously.
//(no need for async, this only happens at start up)

sys.puts('Parsing config files...');
var ls = fs.readdirSync('../conf');

for (var i=0; i < ls.length; i++) {
	conf[ls[i].match(reg)[1]] = eval('('+fs.readFileSync('../conf/'+ls[i]) + ')');
};

exports.getConf = function(key){
	return conf[key];
};

