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
                title:'Hello world',
                items:['one','two','three']   
            };

			var c = callback;

			function cb(out){
				log('got here');
				c(out);
			}
            
            var vl = viewloader.loadView('index', data, cb);
			

        },
        
        fooAction:function(request, callback){


			var a = require('../controllers/dummy').get();
			var c = callback;
			var data = {
				title:'Foo World',
				mod1:false,
				mod2:false,
				mod3:false
			}
			
			function cb(out){
				log('got here');
				c(out);
			}
			
			function handleDone(mod,s){
				
				data[mod] = s;
				
				if(data.mod1 && data.mod2 && data.mod3){
					var vl = viewloader.loadView('foo', data, cb);
				}
			}
			
			a.indexAction(request, function(s){
				handleDone('mod1', s);
			});
			
			a.indexAction(request, function(s){
				handleDone('mod2', s);
			});
			
			a.indexAction(request, function(s){
				handleDone('mod3', s);
			});

        }
        
    };
    
};


exports.get = function(a){
	return Module();
}