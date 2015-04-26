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
            },
            deleteCssDependencies: {
                src: ['<%=vendorFolder %>/**/*.css']
            },
            deleteVersionedLess: {
                src: ['<%=vendorFolder %>/less/less-*.js']
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
                        '<%= vendorFolder %>/pubsub-js/pubsub.js',
                        '<%= vendorFolder %>/jquery/jquery.js',
                        '<%= vendorFolder %>/jquery-powertip-dist/jquery.powertip.js',
                        '<%= vendorFolder %>/jQuery.dotdotdot/jquery.dotdotdot.js',
                        '<%= vendorFolder %>/angular/angular.js',
                        '<%= vendorFolder %>/angular-ui-router/angular-ui-router.js',
                        '<%= vendorFolder %>/angular-sanitize/angular-sanitize.js',
                        '<%= vendorFolder %>/angular-animate/angular-animate.js',
                        '<%= vendorFolder %>/nprogress/nprogress.js',
                        '<%= vendorFolder %>/ng-tags-input/ng-tags-input.min.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false, //reduce names of local variables to (usually) single-letters.
                report: 'min',
                banner: ''
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
                dest: '<%= srcFolder %>/common/templates.js'
            }
        },
        shell: {
            startSelenium: {
                command: 'java -jar ./node_modules/protractor/bin/selenium/selenium-server-standalone-2.37.0.jar ' +
                    '-Dwebdriver.chrome.driver=./node_modules/protractor/bin/selenium/chromedriver.exe',
                options: { stdout: true }
            },
            startProtractor: { command: '.\\node_modules\\.bin\\protractor .\\frontend\\build\\e2e\\customConf.js', options: { stdout: true } },
            startNode: { command: '"C:\\Program Files (x86)\\nodejs\\node.exe" node_modules\\supervisor\\lib\\cli-wrapper.js --exec "C:\\Program Files (x86)\\nodejs\\node.exe" --no-restart-on exit backend\\server.js', options: { stdout: true } },
            startMongo: { command: '"' + grunt.option('mongo-path') + '"', options: { async: true, stdout: true }},
            githubAdd: { command: 'git add .', options: { stdout: true } },
            githubCommit: { command: 'git commit -m "#0 prod update"', options: { stdout: true } },
            githubPush: { command: 'git push', options: { stdout: true } },
            herokuPush: { command: 'git push heroku master', options: { stdout: true } },
            herokuLog: { command: 'heroku logs --tail', options: { stdout: true } },
            saveLastLocalDBBackup: {
                command: 'rename C:\\menzit\\dbBackup\\local\\last %random%',
                options: { stdout: true }
            },
            saveLastRemoteDBBackup: {
                command: 'rename C:\\menzit\\dbBackup\\remote\\last %random%',
                options: { stdout: true }
            },
            backupLocalDB: {
                command: '"C:\\Program Files\\MongoDB 2.6 Standard\\bin\\mongodump" -h <%= pkg.db.dev.host %>:<%= pkg.db.dev.port %> -o C:\\menzit\\dbBackup\\local\\last -db menzit',
                options: { stdout: true }
            },
            backupRemoteDB: {
                command: '"C:\\Program Files\\MongoDB 2.6 Standard\\bin\\mongodump" -h <%= pkg.db.test.host %>:<%= pkg.db.test.port %> -o C:\\menzit\\dbBackup\\remote\\last -u <%= pkg.db.test.user %> -p <%= pkg.db.test.password %> -db menzit',
                options: { stdout: true }
            },
            migrateDevToTestDB: {
                command: '"C:\\Program Files\\MongoDB 2.6 Standard\\bin\\mongorestore" -h <%= pkg.db.test.host %>:<%= pkg.db.test.port %> -u <%= pkg.db.test.user %> -p <%= pkg.db.test.password %> -db menzit --drop C:\\menzit\\dbBackup\\local\\last\\menzit',
                options: { stdout: true }
            },
            migrateTestToDevDB: {
                command: '"C:\\Program Files\\MongoDB 2.6 Standard\\bin\\mongorestore" -h <%= pkg.db.dev.host %>:<%= pkg.db.dev.port %> -db menzit --drop C:\\menzit\\dbBackup\\remote\\last\\menzit',
                options: { stdout: true }
            },
            optimizeSvg: {
                command:    'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/portal && ' +
                            'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/portal/home && ' +
                            'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/portal/howItWorks && ' +
                            'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/portal/contact' +
                            'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/common/pageNotFound' +
                            'node node_modules/svgo/bin/svgo -f <%= srcFolder %>/common/browserNotSupported',
                options: { stdout: true }}
        },
        watch: {
            templates: {
                files: ['<%= srcFolder %>/**/*.html'],
                tasks: ['generateTemplates'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['<%= srcFolder %>/**/*.less'],
                tasks: ['compileLess'],
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
            },
            convertCssDependenciesToLess: {
                expand: true,
                cwd: '<%= vendorFolder %>',
                src: ['**/*.css'],
                dest: '<%= vendorFolder %>',
                rename: function(dest, src) {
                    return dest + src.substring(0, src.indexOf('.css')) + '.less';
                }
            },
            removeVersionFromLess: {
                expand: true,
                cwd: '<%= vendorFolder %>/less',
                src: ['./less-*.js'],
                dest: '<%= vendorFolder %>/less',
                rename: function(dest) {
                    return dest + '/less.js';
                }
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
        },
        bower: {
            install: {
               options: {
                   targetDir: '<%= vendorFolder %>',
                   cleanBowerDir: true,
                   cleanTargetDir: true
               }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            setupDevEnv: {
                tasks: ['watch:templates', 'watch:less', 'watch:ttf', 'startMongo', 'startNode']
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
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('updateTtf', ['svg2ttf', 'copy:ttf', 'clean:ttf']);
    grunt.registerTask('runJshint', ['jshint']);
    grunt.registerTask('startKarma', ['karma:watch']);
    grunt.registerTask('startSelenium', ['shell:startSelenium']);
    grunt.registerTask('startProtractor', ['shell:startProtractor']);
    grunt.registerTask('startNode', ['shell:startNode']);
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
    grunt.registerTask('optimizeVendorJs', ['concat:vendor', 'uglify:vendor']);
    grunt.registerTask('optimizeSvg', ['shell:optimizeSvg']);
    grunt.registerTask('migrateDevToTestDB', ['shell:saveLastRemoteDBBackup', 'shell:backupLocalDB', 'shell:backupRemoteDB', 'shell:migrateDevToTestDB']);
    grunt.registerTask('migrateTestToDevDB', ['shell:saveLastLocalDBBackup', 'shell:backupLocalDB', 'shell:backupRemoteDB', 'shell:migrateTestToDevDB']);
    grunt.registerTask('buildDependencies', ['bower', 'copy:convertCssDependenciesToLess',
        'copy:removeVersionFromLess', 'clean:deleteCssDependencies', 'clean:deleteVersionedLess', 'optimizeVendorJs']);
    grunt.registerTask('setupDevEnv', ['concurrent:setupDevEnv']);
    grunt.registerTask('dev', ['setDevDb', 'cleanDist', 'setDevLoader', 'buildDependencies', 'compileLess']);
    grunt.registerTask('test', ['setTestDb', 'cleanDist', 'setProdLoader', 'buildDependencies', 'optimizeJs', 'compileLess',
        'optimizeSvg', 'compileLess', 'githubPush', 'herokuPush', 'dev', 'githubPush']);
};