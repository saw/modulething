var sys = require('sys'),
fs      = require('fs');


exports.log = function(item){
    
    if(typeof(item) == "string"){
        sys.puts(item);
    }else{
        sys.puts(JSON.stringify(item));
    }
    
}

exports.clone = function(object){
    var F = function() {};
    F.prototype = object;
    return new F();
}