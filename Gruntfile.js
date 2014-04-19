module.exports = function(grunt) {
    grunt.initConfig({

        sass: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'public/css/scss',
                    src: 'main.scss',
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: ['public/css/scss/main.scss'],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            express: {
                files: [
                    'routes/**/*.js',
                    'app.js'
                ],
                tasks: ['express'],
                options: {
                    spawn: false
                }
            },
            server: {
                files: [
                    'public/js/**/*.js'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            }
        },

        requirejs: {
            build: { /* Подзадача */
                options: {
                    almond: true,
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public/js/build/main.js"
                }
            }
        },

        uglify: {
            build: { /* Подзадача */
                files: [{
                    src: ['public/js/build.js'],
                    dest: 'public/js/build.min.js'
                }]
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'public/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'public/css/',
                ext: '.min.css'
            }
        },

        concat: {
            build: { /* Подзадача */
                options: {
                    separator: ';\n'
                },
                src: ['public/js/lib/almond.js', 'public/js/build/main.js'],
                dest: 'public/js/build/main.js'
            }
        },

        express: {
            server: {
                options: {
                    livereload: true,
                    port: 8000,
                    script: 'app.js'
                }
            }
        },

        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public/js/tmpl'
                }],
                options: {
                    template: function(data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });', {
                                data: data
                            }
                        );
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-fest');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['express', 'watch']);
    grunt.registerTask(
        'build', [
            'cssmin', 'fest', 'sass', 'requirejs:build',
            'concat:build', 'uglify:build'
        ]
    );

};