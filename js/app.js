---
---

var avoid = {{site.data.avoid.avoid | jsonify }};
var omit = {{site.data.omit.omit | jsonify }};
var swap = {{site.data.swap.swap | jsonify }};

var app = angular.module('copy-cop',[]);
app.filter('machine', function($sce) {
  return function(text) {
    
    omit.forEach(function(a){
      if (text) text = text.split(RegExp("\\b"+a+"\\b","i")).join("<mark class='omit' data-omit='"+a+"'></mark>");
    });
    
    avoid.forEach(function(a){
      if (text) text = text.split(RegExp("\\b"+a+"\\b","i")).join("<mark class='avoid' data-omit='"+a+"' data=title='avoid this term'></mark>");
    });
    
    swap.forEach(function(swaps){
      for (var key in swaps) {
        if (text) text = text.split(RegExp("\\b"+key+"\\b","i")).join("<mark class='omit'  data-omit='"+key+"'></mark><dfn>"+swaps[key]+"</dfn>");
      }
    });
    
    return $sce.trustAsHtml(text);
  }
});