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

    this.files.forEach(function(fileObj){
      var files = grunt.file.expand({nonull: true}, fileObj.src);
      var dest = grunt.option("dest");
      var src = files.map(function(filepath){
        if (!grunt.file.exists(filepath)) {
          
        }else{
          var file = grunt.file.read(filepath);
          grunt.log.write("Look at this");
          grunt.log.write(file);
          grunt.log.write(dest);
          grunt.log.write(grunt.option);
          grunt.file.write(dest,file);
        }
      });

    });

  });

}
