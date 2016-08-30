module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      //all files to concat
      //make one file
      //just client or not?
      options: {
        separator: ';'
      },
      dist: {
        src: ['client/*.js'],
        dest: 'dist/jqss.js',
        }
    },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {

      options: {
        banner: '/*! jqss <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: 'dist/jqss.js',
        dest: 'dist/jqss.min.js'
      }
    },

    // jshint: {
    //   files: [
    //     // Add filespec list here
    //     //don't check ugly mess, check files first
    //     'app/collections/*.js',
    //     'app/models/*.js',
    //     'app/config.js',
    //     'public/client/*.js'
    //   ],
    //   options: {
    //     force: 'true',
    //     jshintrc: '.jshintrc',
    //     ignores: [
    //       'public/lib/**/*.js',
    //       'public/dist/**/*.js'
    //     ],
    //     reporterOutput: ""
    //   }
    // },

    cssmin: {
      //minimize css
        dist: {
          src: 'client/style.css',
          dest: 'dist/style.min.css'
        }
    },

    watch: {
      scripts: {
        files: [
          'client/*.js'
          // 'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    // 'jshint',
    // 'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // 'test',
    'build',
    'upload --prod'
  ]);


};
