var modUtils = require('../lib/utils'),
viewloader   = require('../helpers/viewLoader');
var log = modUtils.log;


var api = null;


var Module = function(){
    
    
    return {
        
        init:function(api){
            modUtils.log(api);
        },
        
        
        
        indexAction:function(request, callback){
            var data = {
                label:'This is a dummy module',
				id:'foo'
            };

			var c = callback;

			function cb(out){
				log('got here');
				c(out);
			}
            
            var vl = viewloader.loadView('dummy', data, cb);
			

        }
        
    };
    
};


exports.get = function(a){
	return Module();
}