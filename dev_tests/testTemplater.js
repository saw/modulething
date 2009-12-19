var sys = require("sys"),
  posix = require("posix"),
  utils = require('utils'),
  puts  = sys.puts;
var tmpl = require('../lib/templater').tmpl;

var myTemplate = '<p><%=foo %><% if(1==2){ %><i><%=biz %></i><% } %></p>';
puts(tmpl(myTemplate, {foo:'bar', biz:'baz'}));
