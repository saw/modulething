var fs = require('fs'),
conf   = require('../modules/conf'),
sys    = require('sys'),
url    = require('url');

var api = {
	
	getConf:conf.getConf
	
};


function handleRequest(request, response, callback){
	
	var path = url.parse(request.url).pathname;
	sys.puts(path);
	response.writeHeader(200, {'Content-Type':'text/html'});
	response.write('This is great');
	
	callback(response);
}

exports.handleRequest = handleRequest;