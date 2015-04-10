/*
 * PlatypiCLI Generated Gruntfile
 */
var DEBUG = true,
    path = require('path'),
    stringify = require('stringify'),
    nodePath = path.normalize('./node_modules/.bin/');

stringify = stringify({
    extensions: ['.html'],
    minify: false,
    minifier: {
        extensions: ['.html'],
        options: {
            collapseWhitespace: true,
            preserveLineBreaks: false,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: false,
            removeRedundantAttributes: true,
            caseSensitive: true
        }
    }
});

//Determines which platforms should be added for Cordova projects
var cordovaPlatforms = []; //add 'android' if you want to support Android
if (process.platform === 'win32') {
    cordovaPlatforms.push('windows');
} else if (process.platform === 'darwin') {
    cordovaPlatforms.push('ios');
}

module.exports = function (grunt) {
    var projectFiles = [
        './public/*.ts',
        './public/**/*.ts'
    ],
    lintIgnoreFiles = [
        '!./public/typings/**',
        '!./public/lib/**'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    './public/app.js': './public/main.js'
                },
                options: {
                    commondir: true,
                    browserifyOptions: {
                        debug: DEBUG
                    },
                    transform: [
                        stringify,
                        'deamdify'
                    ]
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            bundle: [
                './public/app.js',
                './public/app.js.map',
                './public/style.css',
                './public/style.css.map'
            ],
            cordovaProject: [
                './cordova/www'
            ]
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            build: {
                tasks: [
                    'ts:client',
                    'less'
                ]
            },
            bundle: {
                tasks: [
                    'cssmin',
                    'bundle'
                ]
            },
            run: {
                tasks: [
                    'watch',
                    'nodemon'
                ]
            }
        },
        copy: {
            cordovaProjectFiles: {
                files: [
                    {
                        expand: true, flatten: true,
                        src: [
                            './public/index.html',
                            './public/app.js',
                            './public/style.css'
                        ],
                        dest: './cordova/www'
                    },
                    {
                        expand: true, cwd: './public',
                        src: [
                            'common/assets/**',
                        ],
                        dest: './cordova/www/'
                    }
                ],
                options: {
                    process: function (data, srcpath) {
                        if (/style\.css$/.test(srcpath)) {
                            data = data.replace(/(\(|'|")\/common\/assets/g, '$1common/assets');
                        } else if(/index\.html$/.test(srcpath)) {
                            var scriptStart = data.indexOf('<script');
                            data = data.slice(0, scriptStart) + '\n<script type="text/javascript" src="cordova.js"></script>\n' + data.slice(scriptStart);
                        }
                        return data;
                    },
                    processContentExclude: [
                        '**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'
                    ],
                    noProcess: [
                        '**/*.{png,gif,jpg,ico,psd,ttf,otf,woff,svg}'
                    ]
                }
            }
        },
        cordovacli: {
            options: {
                path: 'cordova'
            },
            create: {
                options: {
                    command: 'create',
                    id: 'plat.innohack',
                    name: 'innohack'
                }
            },
            add_platforms: {
                options: {
                    command: 'platform',
                    action: 'add',
                    platforms: cordovaPlatforms
                }
            },
            add_plugins: {
                options: {
                    command: 'plugin',
                    action: 'add',
                    plugins: [
                        'network-information',
                        'splashscreen',
                        'org.apache.cordova.statusbar',
                        'https://github.com/ccsoft/cordova-facebook'
                    ]
                }
            },
            build: {
                options: {
                    command: 'build'
                }
            }
        },
        cssmin: {
            combine: {
                options: {
                    keepSpecialComments: 0,
                    target: 'public/style.css'
                },
                files: {
                    // Add files (e.g. bootstrap) in here to combine them into 1 output css file.
                    './public/style.css': [
                        './public/common/css/main.css'
                    ]
                }
            }
        },
        less: {
            main: {
                options: {
                    compress: true,
                    relativeUrls: true,
                    sourceMap: DEBUG
                },
                files: {
                    'public/common/css/main.css': 'public/common/css/main.less'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    watch: ['public']
                }
            }
        },
        shell: {
            tsd: {
                command: [
                    nodePath + 'tsd reinstall -so --config tsd.public.json',
                    nodePath + 'tsd link --config tsd.public.json'
                ].join(' && ')
            },
            options: {
                stdout: true,
                stdin: false
            }
        },
        ts: {
            options: {
                target: 'es5',
                module: 'commonjs',
                sourceMap: DEBUG,
                noImplicitAny: true,
                fast: 'always'
            },
            client: {
                src: projectFiles.concat(lintIgnoreFiles)
            }
        },
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            client: {
                src: projectFiles.concat(lintIgnoreFiles)
            }
        },
        uglify: {
            options: {
                sourceMap: false,
                mangle: true
            },
            bundle: {
                files: {
                    './public/app.js': [
                        './public/app.js'
                    ]
                }
            }
        },
        watch: {
            client: {
                files: projectFiles,
                tasks: ['ts:client']
            },
            less: {
                files: ['./public/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            browserify: {
                files: ['./public/**/*.js', './public/**/*.html', '!./public/app.js'],
                tasks: ['bundle']
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-cordovacli');

    //Tasks for Cordova project building
    grunt.registerTask('make-cordova-directory', 'Creates a directory for cordova projects.', function () {
        grunt.file.mkdir('cordova/');
        grunt.log.writeln('Created cordova directory.');
    });
    grunt.registerTask('setup-cordova', ['make-cordova-directory', 'cordovacli:create', 'cordovacli:add_platforms', 'cordovacli:add_plugins']);
    grunt.registerTask('cordova-copy', ['clean:cordovaProject', 'build', 'copy:cordovaProjectFiles']);
    grunt.registerTask('build-cordova', ['cordova-copy', 'cordovacli:build']);

    //Tasks for building and debuging
    grunt.registerTask('tsd-install', ['shell:tsd']); //install typings from DefinitelyTyped
    grunt.registerTask('install', ['tsd-install']);
    grunt.registerTask('bundle', ['browserify'].concat(DEBUG ? [] : ['uglify'])); //combine all js into one file.  Uglify when DEBUG=false
    grunt.registerTask('build', ['clean:bundle', 'concurrent:build', 'concurrent:bundle']); // Concurrently compiles all the typescript/less, then bundles the JS with browserify
    grunt.registerTask('run', ['concurrent:run']);
    grunt.registerTask('default', ['build', 'concurrent:run']); // Default Task, watches the directory for changes, rebuilds.
};
