var sys = require('sys'), 
   http = require('http'),
   engine = require('./engine');

var responseFacade = function(response){
	
	
	var _headerSent = false, 
	bodyStart = false, 
	_response = response,
	 _body='',
	_headers = {'Content-Type':"text/html"},
	_respCode = 200;
	
	return {
		
		writeHeader:function(code, headers){
			if(_headerSent){
				return false;
			}else{
				_respCode = code;
				
			}
		},
		
		write:function(chunk){
			_body+=chunk;			
		},
		
		finish:function(){
			_headers['Content-Length'] = _body.length;
			_response.writeHeader(_respCode, _headers);
			_response.write(_body + '\n');
			_response.close();
		}
		
	}
	
}

function handleRequest(req, res){
	var response = res;
	engine.handleRequest(req, responseFacade(response), function(rf){
		rf.finish();
	});
	
}

http.createServer(handleRequest).listen(8000);
sys.puts('Server running at http://127.0.0.1:8000/');
