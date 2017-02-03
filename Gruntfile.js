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
                        'media/**/*'
                    ],
                    dest: 'dist'
                }

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
            clean: {
                dist: {
                    src: [
                        'dist/**'
                    ]
                }
            },
            watch: {
                build: {
                    files: watchedFiles,
                    tasks: [
                        'build'
                    ]
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-bump');

        /**
         * Alias tasks
         */

        grunt.registerTask('default', ['build']);

        grunt.registerTask('build', [
            'clean',
            'copy'
        ]);

    };

}());
