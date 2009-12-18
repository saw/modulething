var sys = require('sys');


exports.log = function(item){
    
    if(typeof(item) == "string"){
        sys.puts(item);
    }else{
        sys.puts(JSON.stringify(item));
    }
    
}