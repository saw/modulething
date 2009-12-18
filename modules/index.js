exports.init = function(api){
    
    
};

exports.handleRequest = function(request, response){
    
    response.sendHeader(200, {'Content-Type':'text/plain'});
    response.sendBody('handled by index mod!\n');
    response.finish();
    
};