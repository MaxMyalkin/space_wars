module.exports = function(grunt) {
    grunt.initConfig({

        sass: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'public/css/scss/pc',
                    src: 'main.scss',
                    dest: 'public/css',
                    ext: '_console.css'
                }, {
                    expand: true,
                    cwd: 'public/css/scss/joystick',
                    src: 'main.scss',
                    dest: 'public/css',
                    ext: '_joystick.css'
                }]
            }
        },

        watch: {
            sass: {
                files: ['public/css/scss/pc/*.scss', 'public/css/scss/joystick/*.scss'],
                tasks: ['sass'],
                options: {
                    atBegin: true
                }
            },
            fest: {
                files: ['templates/*.xml', 'templates/forms/*.xml'],
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
            build: {
                options: {
                    almond: true,
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    name: "main",
                    optimize: "none",
                    out: "public/js/production/console.js"
                }
            },
            build_joystick: {
                options: {
                    almond: true,
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/joystick/joystick.js",
                    name: "joystick/joystick",
                    optimize: "none",
                    out: "public/js/production/joystick.js"
                }
            }
        },

        uglify: {
            build: {
                files: [{
                    src: ['public/js/production/console.js'],
                    dest: 'public/js/production/console.min.js'
                }, {
                    src: ['public/js/production/joystick.js'],
                    dest: 'public/js/production/joystick.min.js'
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
            build: {
                options: {
                    separator: ';\n'
                },
                src: ['public/js/lib/almond.js', 'public/js/production/console.js'],
                dest: 'public/js/production/console.js'
            },
            build_joystick: {
                options: {
                    separator: ';\n'
                },
                src: ['public/js/lib/almond.js', 'public/js/production/joystick.js'],
                dest: 'public/js/production/joystick.js'
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
                }, {
                    expand: true,
                    cwd: 'templates/forms',
                    src: '*.xml',
                    dest: 'public/js/tmpl/forms'
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
            'cssmin', 'fest', 'sass', 'requirejs:build', 'requirejs:build_joystick', 'concat:build_joystick',
            'concat:build', 'uglify:build'
        ]
    );

};