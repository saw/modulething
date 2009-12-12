var sys = require("sys"),
   http = require("http");

http.createServer( function (request, response) {
    response.sendHeader(200, {"Content-Type":"text/html"});
    response.sendBody("Hello World\n");
    response.finish();
}).listen(8000);
sys.puts("Server running");
