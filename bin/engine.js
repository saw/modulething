var fs = require('fs'),
conf   = require('../modules/conf'),
sys    = require('sys'),
url    = require('url');

var api = {
	
	getConf:conf.getConf
	
};


function handleRequest(request, response, callback){
	
	var path = url.parse(request.url).pathname;
	
	var route = conf.getConf('routes')[path];
	
	if(route){
		response.writeHeader(200, {'Content-Type':'text/html'});
		var c = require('../controllers/'+route.controller);
		
	}else{
		response.writeHeader(500, {'Content-Type':'text/html'});
		response.write('This sucks');
	}
	

	
	callback(response);
}

exports.handleRequest = handleRequest;