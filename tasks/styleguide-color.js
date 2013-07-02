/*
 * grunt-docpad-styleguide-color
 * https://github.com/jleonard/grunt-docpad-styleguide-color
 *
 * Copyright (c) 2013 John Leonard
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

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
         
          grunt.file.write(dest,file);
        }
      });

    });

  });

}
