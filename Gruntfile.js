module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jasmine : {
      src: 'src/**/*.js',
      options: {
        specs: 'test/**/*.js'
      }
    },
    express: {
      dev: {
        options: {
          cmd: 'coffee',
          script: 'server.coffee'
        }
      }
    },

    coffeelint: {
      app: 'src/**/*.coffee'
    },

    coffee: {
      glob_to_multiple: {
        options: {
          sourceMap: true,
          sourceMapDir: 'src/compiled/'
        },

        expand: true,
        flatten: true,
        cwd: 'src/',
        src: ['*/**/*.coffee'],
        dest: 'src/compiled',
        ext: '.js'
      }
    },


    watch: {
      files: ['src/**/*.coffee'],
      tasks: ['coffeelint','coffee']
    }

    // shell: {
    //   test: {
    //     command: 'jasmine-node --coffee test/api_spec.coffee'
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell');


  // deafult tasks lints and compiles coffe
  // use grunt command no options

  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('jaz', 'jasmine');
  // grunt.registerTask('test', 'shell:test');
  grunt.registerTask('serve', ['express:dev','test']);
  grunt.registerTask('travis', ['build', 'serve']);

};
