var sys = require('sys'),
   modUtils = require('../lib/utils'),
   log = modUtils.log,
   oop   = require('../lib/oop');

//Constants
var STOP_COMMAND = '/mod-stop';

var moduleTemplateCache = {};

function ModuleFactory(moduleName){
    var myMod;
    if(moduleTemplateCache[moduleName]){
        myMod = oop.clone(moduleTemplateCache[moduleName]);
    }else{
        var template = require('../modules/'+moduleName);
    }
    
    
}

var RouteResolver = function(){
    
    
    return {
        
        /**
         * @return object { module:'', action: '' params:{}}
         * //todo user should be able to specify their own function to resolve a route
         */
        resolveRoute:function(path){
           var pathArray = path.substring(1).split('/');
           log(path);
           log(pathArray);
           

        }
        
    };
    
    
}();

function stopServer(request, response){
    sys.puts('Stopping server.');
    response.sendHeader(200, {'Content-Type':'text/plain'});
    response.sendBody('Server Stopped.\n');
    response.finish();
    setTimeout(process.exit, 1);
}



function dispatchRequest(request, response){
    response.sendHeader(200, {'Content-Type':'text/html'});
    
    RouteResolver.resolveRoute(request.uri.path);
    var myMod = ModuleFactory('index');
    myMod.init({});
    myMod.handleRequest(request, response);

}

exports.handleRequest = function ( request, response ) {
    if(request.uri.path == STOP_COMMAND && request.client.remoteAddress == '127.0.0.1'){
        stopServer(request, response);
    }else{
        dispatchRequest(request, response);
    }
};
    
