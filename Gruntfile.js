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
          script: 'src/server.coffee'
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

    shell: {
      test: {
        options: {
          stdout: true
        },
        command: 'jasmine-node --coffee test/api_spec.coffee'
      },

      server: {
        options: {
          stdout: true
        },
        command: 'nodemon src/server.coffee'
      }
    }
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
  grunt.registerTask('default', 'shell:server');
  grunt.registerTask('jaz', 'jasmine');
  grunt.registerTask('test', ['express:dev','shell:test']);
  grunt.registerTask('travis', ['build']);

};
