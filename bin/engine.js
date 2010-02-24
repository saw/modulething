function handleRequest(request, response, callback){
	
	response.writeHeader(200, {'Content-Type':'text/html'});
	response.write('This is great');
	
	callback(response);
}

exports.handleRequest = handleRequest;