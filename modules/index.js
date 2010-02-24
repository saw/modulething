var modUtils = require('../lib/utils'),
viewloader   = require('../helpers/viewLoader');
var log = modUtils.log;
modUtils.log('foo');

var api = null;


var Module = function(){
    
    
    return {
        
        init:function(api){
            modUtils.log(api);
        },
        
        
        
        indexAction:function(engine){
            log('here');
            var data = {
                title:'Hello world',
                items:['one','two','three']   
            };
             
            
            var vl = viewloader.loadView('index', data);
            vl.addCallback(function(d){
                engine.success(d);
            });
            
            vl.addErrback(function(d){
                engine.success(d);
            });
                    
        },
        
        fooAction:function(engine){
            var data = {
                title:'Foo World',
                items:['one','two','three']   
            };
             
            
            var vl = viewloader.loadView('index', data);
            vl.addCallback(function(d){
                engine.success(d);
            });
            
            vl.addErrback(function(d){
                engine.success(d);
            });
        }
        
    };
    
};


exports.getModule = function(a){
    
    api = a;
    return Module();
    
}