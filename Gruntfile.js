module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        srcFolder: 'frontend/src/',
        vendorFolder: 'frontend/vendor/',
        distFolder: 'frontend/dist/',
        buildFolder: 'frontend/build/',
        clean: {
            dist: {
                src: ['<%= distFolder %>/*']
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
                    '<%= distFolder %>src.min.js': [
                        '<%= srcFolder %>/common/index.js',
                        '<%= srcFolder %>/app/app.js',
                        '<%= srcFolder %>/portal/portal.js',
                        '<%= srcFolder %>/common/**/*.js',
                        '<%= srcFolder %>/portal/**/*.js',
                        '<%= srcFolder %>/app/**/*.js'
                    ]
                }
            },
            vendor: {
                files: {
                    '<%= distFolder %>vendor.min.js': [
                        '<%= vendorFolder %>/pubSub/pubSub.js',
                        '<%= vendorFolder %>/jQuery/jquery.min.js',
                        '<%= vendorFolder %>/jQuery/powerTip/jquery.powertip.min.js',
                        '<%= vendorFolder %>/jQuery/dotdotdot/jquery.dotdotdot.min.js',
                        '<%= vendorFolder %>/angularJs/angular.min.js',
                        '<%= vendorFolder %>/angularJs/angular-ui-router.min.js',
                        '<%= vendorFolder %>/angularJs/angular-animate.min.js',
                        '<%= vendorFolder %>/NProgress/nprogress.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false, //reduce names of local variables to (usually) single-letters.
                report: 'min',
                banner: '/* Minified js files! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            src: {
                files: {
                    '<%= distFolder %>src.min.js': ['<%= distFolder %>src.min.js']
                }
            },
            vendor: {
                files: {
                    '<%= distFolder %>vendor.min.js': ['<%= distFolder %>vendor.min.js']
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
            startProtractor: { command: '.\\node_modules\\.bin\\protractor .\\frontend\\build\\e2e\\customConf.js', options: { stdout: true } },
            startMongo: { command: '"' + grunt.option('path') + '"', options: { async: true, stdout: true }},
            githubAdd: { command: 'git add .', options: { stdout: true } },
            githubCommit: { command: 'git commit -m "#0 prod update"', options: { stdout: true } },
            githubPush: { command: 'git push', options: { stdout: true } },
            herokuPush: { command: 'git push heroku master', options: { stdout: true } },
            herokuLog: { command: 'heroku logs --tail', options: { stdout: true } }
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
            },
            devLoader: {
                src: '<%= buildFolder %>/loader/devLoader.js',
                dest: '<%= srcFolder %>/loader.js',
                filter: 'isFile'
            },
            prodLoader: {
                src: '<%= buildFolder %>/loader/prodLoader.js',
                dest: '<%= srcFolder %>/loader.js',
                filter: 'isFile'
            }
        },
        svg2ttf: {
            from: 'frontend/src/common/mz.svg'
        },
        bumpup: {
            setters: {
                version: function () {
                    return '0.0.1';
                },
                env: function (old, releaseType, options, env) {
                    return env;
                },
                timestamp: function () {
                    return +new Date();
                }
            },
            file: 'package.json'
        },
        less: {
            prod: {
                files: {
                    "<%= distFolder %>/css.css": "<%= srcFolder %>/loader.less"
                }
            }
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
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('updateTtf', ['svg2ttf', 'copy:ttf', 'clean:ttf']);
    grunt.registerTask('runJshint', ['jshint']);
    grunt.registerTask('startKarma', ['karma:watch']);
    grunt.registerTask('startSelenium', ['shell:startSelenium']);
    grunt.registerTask('startProtractor', ['shell:startProtractor']);
    grunt.registerTask('startMongo', ['shell:startMongo']);
    grunt.registerTask('setDevDb', ['bumpup:build:dev']);
    grunt.registerTask('setTestDb', ['bumpup:build:test']);

    grunt.registerTask('generateTemplates', ['html2js']);
    grunt.registerTask('githubPush', ['shell:githubAdd', 'shell:githubCommit', 'shell:githubPush']);
    grunt.registerTask('herokuLog', ['shell:herokuLog']);
    grunt.registerTask('herokuPush', ['shell:herokuPush']);
    grunt.registerTask('cleanDist', ['clean:dist']);
    grunt.registerTask('compileLess', ['less']);
    grunt.registerTask('setDevLoader', ['copy:devLoader']);
    grunt.registerTask('setProdLoader', ['copy:prodLoader']);
    grunt.registerTask('optimizeJs', ['concat', 'uglify']);

    grunt.registerTask('dev', ['setDevDb', 'cleanDist', 'setDevLoader']);
    grunt.registerTask('test', ['setTestDb', 'cleanDist', 'setProdLoader', 'optimizeJs',
        'compileLess', 'githubPush', 'herokuPush']);
};