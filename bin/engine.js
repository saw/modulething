var sys = require('sys'),
   modUtils = require('../lib/utils'),
   ACTION = 'Action',
   log = modUtils.log;

//Constants
var STOP_COMMAND = '/mod-stop';

var moduleTemplateCache = {};

function ModuleFactory(moduleName){
    var myMod;
        var m = require('../modules/index');

        return m.getModule();
    
    
}

var RouteResolver = function(){
    
    
    return {
        
        /**
         * @return object { module:'', action: '' params:{}}
         * //todo user should be able to specify their own function to resolve a route
         */
        resolveRoute:function(request){
           var pathArray = request.uri.path.substring(1).split('/');           
           log(pathArray);
           if(pathArray.length == 0){
               return {module:'index', action:'index'};
           }else{
               if(pathArray.length == 1){
                   return {module: (pathArray[0].length == 0 ? 'index' : pathArray[0]) , 
                   
                   action:'index'};
               }else{
                   return {module:pathArray[0], action:pathArray[1]}; 
               }
           }
        }
        
    };
    
    
}();





function EngineObject(request, module, action, timeout){
    
    var p = new process.Promise(),
        req = request,
        headersSent = false,
        a = action,
        m = module;


    var api = {
        success:function(data){
            p.emitSuccess(data);
        },
        
        getRequestHeaders:function(){
            return req.headers;
        },
        
        getRequest:function(){
            return req.uri;
        }
    }
    
    setTimeout(function(){
        try{
            m[a+ ACTION](api);
        }catch(e){
            p.emitError(e);
        }
    },0);
    
    return p;
    
}

function stopServer(request, response){
    sys.puts('Stopping server.');
    response.sendHeader(200, {'Content-Type':'text/html'});
    response.sendBody('Server Stopped.\n');
    response.finish();
    setTimeout(process.exit, 1);
}


function dispatchRequest(request, response){
    
    
    var route = RouteResolver.resolveRoute(request);
    log(route);
    var myMod = ModuleFactory(route.module);
    
    var modPromise = EngineObject(request, myMod, route.action, 1000);
    
    
    
    var r = response;
    modPromise.addCallback(function(args){
        
        if(typeof(args) == "string"){
            r.sendHeader(200, {'Content-Type':'text/html'});
            r.sendBody('\n');
            r.sendBody(args)
        }else{
            r.sendHeader(200, {'Content-Type':'text/plain'});
            r.sendBody('\n');
            r.sendBody(JSON.stringify(args), 'utf8');
        }
        
        r.finish();
    });
    modPromise.addErrback(function(args){
        if(typeof(args) == "string"){
            r.sendHeader(500, {'Content-Type':'text/html'});
            r.sendBody('\n');
            r.sendBody(args);
        }else{
            r.sendHeader(500, {'Content-Type':'text/plain'});
            r.sendBody('\n');
            r.sendBody(JSON.stringify(args), 'utf8');
        }
        
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
    
