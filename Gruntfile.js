module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFolder: 'frontend/src/',
        vendorFolder: 'frontend/vendor/',
        distFolder: 'frontend/dist/',
        clean: {
            jsMin: {
                src: ['<%= distFolder %>js.min.js']
            },
            ttf: {
                src: ['from']
            }
        },
        jshint: {
            all: ['<%= srcFolder %>/**/*.js'],
            options: {
                '-W014': false, //Bad line breaking,
                '-W060': false //Document.write can be a form of eval (enable once we have a script loader)
            }
        },
        karma: {
            run: {
                configFile: 'frontend/build/tests/unit/karma.conf.js',
                singleRun: true
            },
            watch: {
                configFile: 'frontend/build/tests/unit/karma.conf.js',
                singleRun: false
            }
        },
        concat: {
            src: {
                files: {
                    '<%= distFolder %>js.min.js': ['<%= srcFolder %>/**/*.js']
                }
            },
            lib: {
                files: {
                    '<%= distFolder %>vendor.min.js': ['<%= vendorFolder %>/**/*.js']
                }
            }
        },
        uglify: {
            options: {
                mangle: true, //reduce names of local variables to (usually) single-letters.
                report: 'min',
                banner: '/* Minified js files! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: {
                files: {
                    '<%= distFolder %>js.min.js': ['<%= distFolder %>js.min.js']
                }
            },
            lib: {
                files: {
                    '<%= distFolder %>lib.min.js': ['<%= distFolder %>lib.min.js']
                }
            }
        },
        html2js: {
            options: {
                rename: function (moduleName) {
                    return moduleName.substring(moduleName.lastIndexOf('/') + 1);
                }
            },
            main: {
                src: ['<%= srcFolder %>/**/*.html'],
                dest: '<%= jsFolder %>templates.js'
            }
        },
        shell: {
            startSelenium: {
                command: 'java -jar ./node_modules/protractor/bin/selenium/selenium-server-standalone-2.37.0.jar ' +
                    '-Dwebdriver.chrome.driver=./node_modules/protractor/bin/selenium/chromedriver.exe',
                options: { stdout: true }
            },
            startProtractor:{ command: '.\\node_modules\\.bin\\protractor .\\frontend\\build\\e2e\\customConf.js', options: { stdout: true } },
            startMongo:     { command: '"' + grunt.option('path') + '"', options: { async: true, stdout: true }},
            githubAdd:      { command: 'git add .', options: { stdout: true } },
            githubCommit:   { command: 'git commit -m "#0 prod update"', options: { stdout: true } },
            githubPush:     { command: 'git push', options: { stdout: true } },
            herokuPush:     { command: 'git push heroku master', options: { stdout: true } },
            herokuLog:      { command: 'heroku logs --tail', options: { stdout: true } }
        },
        watch: {
            templates: {
                files: ['<%= srcFolder %>/**/*.html'],
                tasks: ['generateTemplates'],
                options: {
                    spawn: false
                }
            },
            ttf: {
                files: ['<%= srcFolder %>/common/mz.svg'],
                tasks: ['updateTtf'],
                options: {
                    spawn: false
                }
            }
        },
        copy: {
            ttf: {
                src: 'from/mz.ttf',
                dest: 'frontend/src/common/',
                expand: true,
                flatten: true,
                filter: 'isFile'
            }
        },
        svg2ttf: {
            from: 'frontend/src/common/mz.svg'
        },
        bumpup: {
            setters: {
                env: function (old, releaseType, options, env) {
                    return env;
                },
                timestamp: function () {
                    return +new Date();
                }
            },
            file: 'package.json'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-svg2ttf');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('updateTtf', ['svg2ttf', 'copy:ttf', 'clean:ttf']);
    grunt.registerTask('runJshint', ['jshint']);
    grunt.registerTask('startKarma', ['karma:watch']);
    grunt.registerTask('startSelenium', ['shell:startSelenium']);
    grunt.registerTask('startProtractor', ['shell:startProtractor']);
    grunt.registerTask('startMongo', ['shell:startMongo']);
    grunt.registerTask('devDb', ['bumpup:build:dev']);
    grunt.registerTask('testDb', ['bumpup:build:test']);

    grunt.registerTask('generateTemplates', ['html2js']);
    grunt.registerTask('githubPush', ['shell:githubAdd', 'shell:githubCommit', 'shell:githubPush']);
    grunt.registerTask('herokuLog', ['shell:herokuLog']);
    grunt.registerTask('herokuPush', ['shell:herokuPush']);

    grunt.registerTask('dev', ['devDb']);
    grunt.registerTask('prod', ['testDb', 'githubPush', 'herokuPush']);
};