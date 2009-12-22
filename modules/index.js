var modUtils = require('../lib/utils');
modUtils.log('foo');

var api = null;


var Module = function(){
    
    
    return {
        
        init:function(api){
            modUtils.log(api);
        },
        
        
        
        indexAction:function(engine){
            engine.success('Success 2!');
        }
        
    };
    
};


exports.getModule = function(a){
    
    api = a;
    return Module();
    
}