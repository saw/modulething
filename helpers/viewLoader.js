var sys = require("sys"),
  fs = require("fs"),
  utils = require('utils');

var EJS = require('../lib/templater').tmpl;

var Cache = function(){
    
    var size = 0,
    cache    = {};
    
    return {
        add:function(name, templateStr){
            cache[name] = templateStr;
            ++size;
        },
    
        get:function(name){
            if(cache[name]){
                return cache[name];
            }else{
                return false;
            }
        },
    
        remove:function(name){
            if(cache[name]){
                delete(cache(name));
                --size;
                return true;
            }else{
                return false;
            }
        },
    
        clear:function(){
            cache = {};
        },
    
        getSize:function(){
            return size;
        },
        
        //allow global access for rebugging, why not
        _cache:cache,
        _size:size
    };
}();



exports.loadView = function(v, data, callback){

    var viewName = v;

    sys.puts(viewName);
	var mycb = callback;
    var cb = function(err, c){
		if(!err){
			var out = EJS(c, data);

			mycb(out);
		}
        
    };
    fs.readFile('../views/'+viewName+'.nhtml', 'utf8', cb);


};

exports.cacheSize = function(){
    
};

exports.clearCache = function(){
    
};
