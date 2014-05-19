/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                globals: {
                    "angular": true
                }
            },
            node: {
                src: ['../Node/server.js'
                ]
            }
        },
        watch: {
            app: {
                files: ['../Node/**/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        },
        nodemon: {
            dev: {
                options: {
                    args: ['dev'],
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                    },
                    cwd: '../Node/',
                    ignore: ['node_modules/**'],
                    watch: ['../Node/'],
                    delay: 1,
                },
                script: '../Node/server.js'
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    // Default task.
    grunt.registerTask('javascript', ['jshint']);

    grunt.registerTask('default', ['javascript']);

};
