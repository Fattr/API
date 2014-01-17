var path = require('path');
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine : {
      src : 'src/**/*.js',
      options : {
        specs : 'test/**/*.js'
      }
    },

    coffee: {
      glob_to_multiple: {
        options: {
          sourceMap: true
        },
        expand: true,
        flatten: false,
        cwd: 'src',
        src: ['**/*.coffee'],
        dest: 'compiled',
        ext: '.js'
      }
    },

    coffeelint: {
      app: 'src/**/*.coffee'
    },
    watch: {
      files: ['src/**/*.coffee'],
      tasks: ['coffeelint','coffee']
    },

    shell: {
      server: {
        options: {
          stdout: true
        },
        command: 'nodemon server.coffee'
      },
      test: {
        options: {
          stdout: true
        },
        command: 'jasmine-node --coffee test/api_spec.coffee'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-shell');


  // deafult tasks lints and compiles coffe
  // use grunt command no options

  grunt.registerTask('default', 'watch');
  grunt.registerTask('serve', 'shell:server');
  grunt.registerTask('test', 'shell:test');
};