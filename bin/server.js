var sys = require("sys"),
   http = require("http"),
   engine = require("./engine");

http.createServer(engine.handleRequest).listen(8000);
sys.puts("Server running");
