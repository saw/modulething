var sys = require("sys"),
   http = require("http");

http.createServer( function (request, response) {
    sys.puts(JSON.stringify(request.uri.path));
    if(request.uri.path == "/mod-stop"){
        sys.puts('Stopping server.');
        response.sendHeader(200,{"Content-Type":"text/plain"});
        response.sendBody("Server Stopped.\n");
        response.finish();
        setTimeout(process.exit, 9);

    }else{

    response.sendHeader(200, {"Content-Type":"text/html"});
    response.sendBody("Hello World\n");
    response.finish();
    }
}).listen(8000);
sys.puts("Server running");
