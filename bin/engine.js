var sys = require('sys');


//Constants
var STOP_COMMAND = '/mod-stop';


function stopServer(request, response){
    sys.puts('Stopping server.');
    response.sendHeader(200, {'Content-Type':'text/plain'});
    response.sendBody('Server Stopped.\n');
    response.finish();
    setTimeout(process.exit, 1);
}


exports.handleRequest = function ( request, response ) {
    if(request.uri.path == STOP_COMMAND && request.client.remoteAddress == '127.0.0.1'){
        stopServer(request, response);
    }else{
        response.sendHeader(200, {'Content-Type':'text/html'});
        response.sendBody(JSON.stringify(request)+'\n');
        response.finish();
    }
}
    
