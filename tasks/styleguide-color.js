/*
 * grunt-docpad-styleguide-color
 * https://github.com/jleonard/grunt-docpad-styleguide-color
 *
 * Copyright (c) 2013 John Leonard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var S = require('string');
  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  grunt.registerMultiTask('styleguide-color', 'Your task description goes here.', function() {

    var options = this.options({
      dest: ''
    });

    this.files.forEach(function(fileObj){
      var files = grunt.file.expand({nonull: true}, fileObj.src);
      var dest = options.dest;
      var src = files.map(function(filepath){
        if (!grunt.file.exists(filepath)) {
          
        }else{
          var file = grunt.file.read(filepath);
          file = removeComments(file);
          file = file.replace(/ /g,"").replace(/\t/g,"").replace(/\n/g,"");
          var arr = file.split(";");
          var len = arr.length;
          
          var html = "";

          for (var i = 0; i < len -1; i++) {
            var key_val = arr[i].split(":");
            //grunt.log.write(key_val[0]);
            html += makeChip(key_val);
          }
          //console.log(html);
          grunt.file.write(dest,html);
        }
      });

    });

    function makeChip(arr){
      var humanName = S(arr[0].replace("@","")).humanize().toLowerCase();
      var html = '<div class="docs-color">';
      html += '<div class="docs-color-chip" data-toggle="tooltip" data-placement="top" title="" data-original-title="" style="background-color:'+arr[1]+';"><span>'+arr[1]+'</span></div>';
      html += '<p>'+humanName + '<span>'+arr[0]+'</span></p>';
      html += '</div>';
      //console.log(humanName);
      return html;
    }

    function removeComments(str) {
 
        var uid = '_' + +new Date(),
            primatives = [],
            primIndex = 0;
     
        return (
            str
            /* Remove strings */
            .replace(/(['"])(\\\1|.)+?\1/g, function(match){
                primatives[primIndex] = match;
                return (uid + '') + primIndex++;
            })
     
            /* Remove Regexes */
            .replace(/([^\/])(\/(?!\*|\/)(\\\/|.)+?\/[gim]{0,3})/g, function(match, $1, $2){
                primatives[primIndex] = $2;
                return $1 + (uid + '') + primIndex++;
            })
     
            /*
            - Remove single-line comments that contain would-be multi-line delimiters
                E.g. // Comment /* <--
            - Remove multi-line comments that contain would be single-line delimiters
                E.g. /* // <-- 
           */
            .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
     
            /*
            Remove single and multi-line comments,
            no consideration of inner-contents
           */
            .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
     
            /*
            Remove multi-line comments that have a replaced ending (string/regex)
            Greedy, so no inner strings/regexes will stop it.
           */
            .replace(RegExp('\\/\\*[\\s\\S]+' + uid + '\\d+', 'g'), '')
     
            /* Bring back strings & regexes */
            .replace(RegExp(uid + '(\\d+)', 'g'), function(match, n){
                return primatives[n];
            })
        );
     
    }

  });

}
