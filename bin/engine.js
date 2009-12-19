var sys = require('sys'),
   modUtils = require('../lib/utils'),
   log = modUtils.log;

//Constants
var STOP_COMMAND = '/mod-stop';

var moduleTemplateCache = {};

function ModuleFactory(moduleName){
    var myMod;
    if(moduleTemplateCache[moduleName]){
        myMod = modUtils.clone(moduleTemplateCache[moduleName]);
    }else{
        var m = require('../modules/index');
        
        return m.getModule();
    }
    
}

var RouteResolver = function(){
    
    
    return {
        
        /**
         * @return object { module:'', action: '' params:{}}
         * //todo user should be able to specify their own function to resolve a route
         */
        resolveRoute:function(request){
           var pathArray = request.uri.path.substring(1).split('/');           
           
           if(pathArray.length == 0){
               return {module:'index', action:'index'};
           }else{
               if(pathArray.length == 1){
                   return {module:pathArray[0], action:'index'};
               }
           }
        }
        
    };
    
    
}();

function stopServer(request, response){
    sys.puts('Stopping server.');
    response.sendHeader(200, {'Content-Type':'text/html'});
    response.sendBody('Server Stopped.\n');
    response.finish();
    setTimeout(process.exit, 1);
}


function dispatchRequest(request, response){
    
    
    var route = RouteResolver.resolveRoute(request);
    var myMod = ModuleFactory(route.module);

    var modPromise = myMod[route.action + 'Action'](request, 1000);
    
    var r = response;
    modPromise.addCallback(function(args){
        r.sendHeader(200, {'Content-Type':'text/plain'});
        r.sendBody('\n');
        r.sendBody(JSON.stringify(args), 'utf8');
        r.finish();
    });

}

exports.handleRequest = function ( request, response ) {
    if(request.uri.path == STOP_COMMAND && request.client.remoteAddress == '127.0.0.1'){
        stopServer(request, response);
    }else{
        dispatchRequest(request, response);
    }
};
    
