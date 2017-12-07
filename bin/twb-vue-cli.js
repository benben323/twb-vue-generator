#!/usr/bin/env node

var ejs = require('ejs')
var fs = require('fs')
var mkdirp = require('mkdirp')
var sortedObject = require('sorted-object')
var path = require('path')
var program = require('commander')
var readline = require('readline')
var util = require('util')

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

var _exit = process.exit
var pkg = require('../package.json')

var version = pkg.version

process.exit = exit

program
  .name('twbvue')
  .version(version, '   --version')
  .usage('[options] [dir]')
  .option('-v, --view <engine>', 'add view <engine> support (dust|ejs|jade) (defaults to jade)')
  .option('    --git', 'add .gitignore')
  .option('-f, --force', 'force on non-empty directory')
  .parse(process.argv)

if (!exit.exited) {
  main()
}
/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) args[i] = arguments[i]
    return fn.call(this, old, args)
  }
}

/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    fn.call(this)
    old.apply(this, arguments)
  }
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    callback(/^y|yes|ok|true$/i.test(input))
  })
}

/**
 * Copy file from template directory.
 */

function copyTemplate (from, to) {
  from = path.join(__dirname, '..', 'templates', from)
  write(to, fs.readFileSync(from, 'utf-8'))
}

function createApplication (name, path) {
  var wait = 5

  console.log()
  function complete () {
    if (--wait) return
    var prompt = launchedFromCmd() ? '>' : '$'

    console.log()
    console.log('   install dependencies:')
    console.log('     %s cd %s && npm install', promp, path)
    console.log()
    console.log('   run the app:')

    if (launchedFromCmd()) {
      console.log('   %s SET DEBUG=%s:* & npm start', prompt, name)
    } else {
      console.log('   %s DEBUG=%s:* npm start', prompt, name)
    }

    console.log()
  }

  var envConfig = loadTemplate('env_config.js')

  envConfig.locals.config = {}
  envConfig.locals.config.appname = name

  mkdir(path, function () {

    mkdir(path + '/build', function () {      
      mkdir(path + '/build/deploy', function () {

      })
      copyTemplate('build/setup-dev-server.js', path + '/build/setup-dev-server.js')
      copyTemplate('build/vue-loader.config.js', path + '/build/vue-loader.config.js')
      copyTemplate('build/webpack.base.config.js', path + '/build/webpack.base.config.js')
      copyTemplate('build/webpack.client.config.js', path + '/build/webpack.client.config.js')
      copyTemplate('build/webpack.server.config.js', path + '/build/webpack.server.config.js')
    })

    mkdir(path + '/middleware',function () {
      copyTemplate('middleware/auth.js', path + '/middleware/auth.js')
    })

    mkdir(path + '/proxy', function () {
      copyTemplate('proxy/server.js', path + '/proxy/server.js')
    })

    mkdir(path + '/src', function() {
      mkdir(path + '/src/common', function () {
        copyTemplate('src/common/dateUtils.js', path + '/src/common/dateUtils.js')
        copyTemplate('src/common/lodash.pithy.min.js', path + '/src/common/lodash.pithy.min.js')
        copyTemplate('src/common/utils.js', path + '/src/common/utils.js')
      })

      mkdir(path + '/src/components', function () {
        copyTemplate('src/components/SearchHistory.vue', path + '/src/components/SearchHistory.vue')
      })

      mkdir(path + '/src/filters', function () {
        copyTemplate('src/filters/index.js', path + '/src/filters/index.js')
      })

      mkdir(path + '/src/images')

      mkdir(path + '/src/mixins', function () {
        copyTemplate('src/mixins/index.js', path + '/src/mixins/index.js')
      })

      mkdir(path + '/src/router', function () {
        copyTemplate('src/router/index.js', path + '/src/router/index.js')
      })

      mkdir(path + '/src/server', function () {
        mkdir(path + '/src/server/crypto', function () {
          copyTemplate('src/server/crypto/crypto.js', path + '/src/server/crypto/crypto.js')
          copyTemplate('src/server/crypto/des.js', path + '/src/server/crypto/des.js')
          copyTemplate('src/server/crypto/md5.js', path + '/src/server/crypto/md5.js')
        })
        copyTemplate('src/server/util.js', path + '/src/server/util.js')
      })

      mkdir(path + '/src/services', function () {
        copyTemplate('src/services/index.js', path + '/src/services/index.js')
      })

      mkdir(path + '/src/store', function () {
        copyTemplate('src/store/index.js', path + '/src/store/index.js')
        copyTemplate('src/store/actions.js', path + '/src/store/actions.js')
        copyTemplate('src/store/getters.js', path + '/src/store/getters.js')
        copyTemplate('src/store/mutations.js', path + '/src/store/mutations.js')
      })

      mkdir(path + '/src/styles')

      mkdir(path + '/src/util', function () {
        copyTemplate('src/util/filters.js', path + '/src/util/filters.js')
      })

      mkdir(path + '/src/views', function () {
        copyTemplate('src/views/SearchView.vue', path + '/src/views/SearchView.vue')
      })

      copyTemplate('src/app.js', path + '/src/app.js')
      copyTemplate('src/App.vue', path + '/src/App.vue')
      copyTemplate('src/entry-client.js', path + '/src/entry-client.js')
      copyTemplate('src/entry-server.js', path + '/src/entry-server.js')
      copyTemplate('src/index.template.html', path + '/src/index.template.html')
    })

    // package.json
    var pkg = {
      name: name,
      description: '',
      author: '',
      version: '0.0.0',
      private: true,
      scripts: {
        "dev": "node apps",
        "start": "cross-env NODE_ENV=product node apps",
        "start-stage": "cross-env NODE_ENV=stage node apps",
       
    
        "build": "rimraf dist && npm run build:client && npm run build:server",
        "build-product": "rimraf dist && npm run build:client && npm run build:server && npm run deploy-product",
        "deploy-product": "cross-env NODE_ENV=product node ./build/deploy",
        "build:client": "cross-env NODE_ENV=product webpack --config build/webpack.client.config.js --progress --hide-modules",
        "build:server": "cross-env NODE_ENV=product webpack --config build/webpack.server.config.js --progress --hide-modules",
    
    
        "start-hotfix": "cross-env NODE_ENV=stage_test2 node apps",
        "build-hotfix": "rimraf dist && npm run build-hotfix:client && npm run build-hotfix:server",
        "build-stage_test2": "rimraf dist && npm run build-hotfix:client && npm run build-hotfix:server && npm run deploy-stage_test2",
        "deploy-stage_test2": "cross-env NODE_ENV=stage_test2 node ./build/deploy",
        "build-hotfix:client": "cross-env NODE_ENV=stage_test2 webpack --config build/webpack.client.config.js --progress --hide-modules",
        "build-hotfix:server": "cross-env NODE_ENV=stage_test2 webpack --config build/webpack.server.config.js --progress --hide-modules",
    
    
        "start-develop": "cross-env NODE_ENV=stage_test3 node apps",
        "build-develop": "rimraf dist && npm run build-develop:client && npm run build-develop:server",
        "build-stage_test3": "rimraf dist && npm run build-develop:client && npm run build-develop:server",
        "build-develop:client": "cross-env NODE_ENV=stage_test3 webpack --config build/webpack.client.config.js --progress --hide-modules",
        "build-develop:server": "cross-env NODE_ENV=stage_test3 webpack --config build/webpack.server.config.js --progress --hide-modules",
    
    
        "start-release": "cross-env NODE_ENV=stage node apps",
        "build-release": "rimraf dist && npm run build-release:client && npm run build-release:server",
        "build-stage": "rimraf dist && npm run build-release:client && npm run build-release:server && npm run deploy-stage",
        "deploy-stage": "cross-env NODE_ENV=stage node ./build/deploy",
        "build-release:client": "cross-env NODE_ENV=stage webpack --config build/webpack.client.config.js --progress --hide-modules",
        "build-release:server": "cross-env NODE_ENV=stage webpack --config build/webpack.server.config.js --progress --hide-modules"
      },
      engine: {
        "node": ">=7.0",
        "npm": ">=4.0"
      },
      "dependencies": {
        "babel-polyfill": "^6.23.0",
        "compression": "^1.7.0",
        "cross-env": "^4.0.0",
        "es6-promise": "^4.1.1",
        "express": "^4.15.3",
        "extract-text-webpack-plugin": "^2.1.2",
        "firebase": "^3.9.0",
        "lru-cache": "^4.1.1",
        "qrious": "^4.0.2",
        "serialize-javascript": "^1.3.0",
        "superagent": "^3.5.2",
        "serve-favicon": "^2.4.3",
        "vue": "^2.4.1",
        "vue-router": "^2.7.0",
        "vue-server-renderer": "^2.4.1",
        "vuex": "^2.3.1",
        "vuex-router-sync": "^4.2.0",
        "vue-touch": "^2.0.0-beta.1",
        "iflight-mail-address-px": "^0.2.8",
        "uuid": "^3.1.0"
      },
      "devDependencies": {
        "autoprefixer": "^6.7.7",
        "babel-core": "^6.25.0",
        "babel-loader": "^7.1.1",
        "babel-plugin-syntax-dynamic-import": "^6.18.0",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-env": "^1.6.0",
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-stage-2": "^6.24.1",
        "body-parser": "^1.17.2",
        "cookie-parser": "^1.4.3",
        "css-loader": "^0.28.4",
        "file-loader": "^0.11.2",
        "friendly-errors-webpack-plugin": "^1.6.1",
        "glob": "^7.1.2",
        "http-proxy-middleware": "^0.17.4",
        "isomorphic-fetch": "^2.2.1",
        "less": "^2.7.1",
        "less-loader": "^2.2.3",
        "querystring": "^0.2.0",
        "rimraf": "^2.6.1",
        "stylus": "^0.54.5",
        "stylus-loader": "^3.0.1",
        "sw-precache-webpack-plugin": "^0.10.1",
        "url-loader": "^0.5.9",
        "vue-loader": "^13.0.1",
        "vue-style-loader": "^3.0.0",
        "vue-template-compiler": "^2.4.1",
        "webpack": "^3.2.0",
        "webpack-dev-middleware": "^1.11.0",
        "webpack-hot-middleware": "^2.18.2",
        "webpack-merge": "^4.0.0",
        "webpack-node-externals": "^1.6.0"
      }
    }

    write(path + '/package.json', JSON.stringify(pkg, null, 2) + '\n')
    write(path + '/envConfig.js', envConfig.render())

    copyTemplate('apps.js', path + '/apps.js')
    copyTemplate('babelrc', path + '/.babelrc')

    if (program.git) {
      copyTemplate('gitignore', path + '/.gitignore')
    }

    complete()
  })
}

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory (path, fn) {
  fs.readdir(path, function (err, files) {
    if (err && err.code !== 'ENOENT') throw err
    fn(!files || !files.length)
  })
}

/**
 * Graceful exit for async STDIO
 */

function exit (code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done () {
    if (!(draining--)) _exit(code)
  }

  var draining = 0
  var streams = [process.stdout, process.stderr]

  exit.exited = true

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1
    stream.write('', done)
  })

  done()
}

/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */

function createAppName (pathName) {
  return path.basename(pathName)
    .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

/**
 * Load template file.
 */

function loadTemplate (name) {
  var contents = fs.readFileSync(path.join(__dirname, '..', 'templates', (name + '.ejs')), 'utf-8')
  var locals = Object.create(null)

  function render () {
    return ejs.render(contents, locals)
  }

  return {
    locals: locals,
    render: render
  }
}

function main () {
  var destinationPath = program.args.shift() || '.'

  var appName = createAppName(path.resolve(destinationPath)) || 'hello-world'
  
  // TODO  参数校检

  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createApplication(appName, destinationPath)
    } else {
      confirm('destination is not empty, continue? [y/N] ', function (ok) {
        if (ok) {
         process.stdin.destroy()
         createApplication(appName, destinationPath)
        } else {
          console.error('aborting')
          exit(1)
        }
      })
    }
  })
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir (path, fn) {
  mkdirp(path, MODE_0755, function (err) {
    if (err) throw err
    console.log('   \x1b[36mcreate\x1b[0m : ' + path)
    fn && fn()
  })
}

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName
 * @param {String} newName
 */

function renamedOption (originalName, newName) {
  return function (val) {
    warning(util.format("option `%s' has been renamed to `%s'", originalName, newName))
    return val
  }
}

/**
 * Display a warning similar to how errors are displayed by commander.
 *
 * @param {String} message
 */

function warning (message) {
  console.error()
  message.split('\n').forEach(function (line) {
    console.error('  warning: %s', line)
  })
  console.error()
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write (path, str, mode) {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + path)
}
