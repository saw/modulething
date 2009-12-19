var sys = require("sys"),
  posix = require("posix"),
  utils = require('utils');

var EJS = require('../lib/templates').EJS;

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



exports.loadView = function(path, data, cacheable){
    p = new process.Promise();
    
    var thisTemplate = Cache.get(path);
    if(thisTemplate){
        setTimeout(function(){
            p.emitSuccess()
        })
    }
    
    return p;
};

exports.cacheSize = function(){
    
};

exports.clearCache = function(){
    
};
