var modUtils = require('../lib/utils');
modUtils.log('foo');

var api = null;


var Module = function(){
    
    
    return {
        
        init:function(api){
            modUtils.log(api);
        },
        
        
        
        indexAction:function(request, timeout){
            
            this.promise = new process.Promise;
            this.promise.timeout = timeout;
            
            var p = this.promise;
            setTimeout(function(){
                p.emitSuccess('success!');
            }, 10);
            
            return this.promise;
        }
        
    };
    
};


exports.getModule = function(a){
    
    api = a;
    return Module();
    
}