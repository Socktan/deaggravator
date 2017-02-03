(function () {

    'use strict';

    module.exports = function (grunt) {

        var watchedFiles = [
            'css/**/*',
            'fonts/**/*',
            'img/**/*',
            'js/**/*',
            'media/**/*',
            '*.html',
            '*.json',
            '*.js',
            '!dist'
        ];

        /**
         * Grunt Tasks and Configurations
         */
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            copy: {
                build: {
                    expand: true,
                    src: [
                        '*.html',
                        'img/**',
                        'demo/**',
                        'fonts/**',
                        'js/**/*',
                        'media/'
                    ],
                    dest: 'dist'
                },
                all: {
                    expand: true,
                    src: [
                        '*.html',
                        'img/**',
                        'css/**',
                        'demo/**',
                        'fonts/**',
                        'js/**',
                        'media/**/*'
                    ],
                    dest: 'dist'
                },
                /**
                 * Copies original source from src/js to build/js/src/js for source map debugging.
                 */
                src: {
                    files: [
                        {
                            expand: true,
                            src: '*.js',
                            dest: 'dist/js/src/js'
                        }
                    ]
                },
                other: {
                    files: [
                        {
                            expand: true,
                            src: [
                                'img/**',
                                'cache.manifest',
                                'favicon.ico'
                            ],
                            dest: 'dist/'
                        }
                    ]
                },
                js: {
                    files: [
                        {
                            expand: true,
                            src: '**',
                            dest: 'dist/js'
                        }
                    ]
                }
            },
            htmlmin: {
                build: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        'dist/index.html': 'index.html'
                    }
                }
            },
            jshint: {
                options: {
                    reporter: require('jshint-stylish'),
                    jshintrc: true
                },
                test: [
                    'js/app/**/*.js',
                    'Gruntfile.js'
                ]
            },
            bump: {
                options: {
                    updateConfigs: ['pkg'],
                    commit: true,
                    commitMessage: 'Release v%VERSION%',
                    tagName: 'v%VERSION%',
                    tagMessage: 'Version %VERSION%',
                    push: true,
                    pushTo: 'origin',
                    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                    globalReplace: false,
                    prereleaseName: false,
                    metadata: '',
                    regExp: false
                }
            },
            connect: {
                server: {
                    options: {
                        port: 8000,
                        base: 'dist'
                    }
                }
            },
            clean: {
                dist: {
                    src: [
                        'dist/**'
                    ]
                }
            },
            watch: {
                options: {
                    atBegin: true
                },
                build: {
                    files: watchedFiles,
                    tasks: [
                        'default'
                    ]
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-bump');

        /**
         * Alias tasks
         */

        grunt.registerTask('default', ['build']);

        grunt.registerTask('build', [
            'clean',
            'copy:build',
            'htmlmin:build'
        ]);

        grunt.registerTask('test', [
            'jshint'
        ]);

    };

}());
