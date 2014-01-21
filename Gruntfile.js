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
          script: 'src/app.coffee'
        }
      }
    },

    coffeelint: {
      app: 'src/**/*.coffee'
    },

    coffee: {
      options: {
        sourceMap: true
      },

      compile: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.coffee',
          dest: 'target',
          ext: '.js'
        }]
      }
    },

    watch: {
      files: ['src/**/*.coffee'],
      tasks: ['coffeelint','coffee']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'coffee-script'
        },
        src: ['src/test/**/*.coffee']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mocha-test');

  // deafult tasks lints and compiles coffe
  // use grunt command no options

  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('default', 'shell:server');
  grunt.registerTask('test', 'mochaTest:test');
  grunt.registerTask('travis', ['build', 'test']);

};
