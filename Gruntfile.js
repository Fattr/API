
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
    express: {
      options: {

      },
      dev: {
        options: {
          cmd: 'coffee',
          script: 'server.coffee'
        }
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
      tasks: ['coffeelint','shell:coffeecompile']
    },

    shell: {
      test: {
        options: {
          stdout: true
        },
        command: 'jasmine-node --coffee test/api_spec.coffee'
      },
    },
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
  grunt.registerTask('default', 'watch');
  grunt.registerTask('test', 'shell:test');
  grunt.registerTask('serve', ['express:dev','test']);
  grunt.registerTask('travis', ['build','serve']);
};