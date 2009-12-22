var sys = require("sys"),
  posix = require("posix"),
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



exports.loadView = function(v, data, cacheable){
    var p = new process.Promise();
    var viewName = v;

        sys.puts(viewName);
        var f = posix.cat('../views/'+viewName+'.nhtml');
        f.addCallback(function(c){
            p.emitSuccess(EJS(c, data));
            //Cache.set(viewName, c);
        });
    
    
    return p;
};

exports.cacheSize = function(){
    
};

exports.clearCache = function(){
    
};
