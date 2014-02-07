var spawn = require('child_process').spawn
var exists = require('fs').existsSync

// Normalize arch string to match golang-style
var arch = process.arch
if (arch === 'ia32') {
  arch = '386'
}
if (arch === 'x64') {
  arch = 'amd64'
}

// Normalize platform string to match golang-style
var platform = process.platform
if (platform === 'win32') {
  platform = 'windows'
}

// Check existence of executable for the given platform and architecture
var execPath = './bcrypt-' + platform + '-' + arch
if ( ! exists(execPath)) {
  console.error('isolated-bcrypt does not support this platform')
}

exports.hash = function (password) {
  var callback = arguments[arguments.length - 1]
  var p = spawn(execPath, ['hash', password], {
    cwd: __dirname
  })

  handle(p, callback)
}

exports.compare = function (hash, password, callback) {
  var p = spawn(execPath, ['compare', password, '"' + hash + '"'], {
    cwd: __dirname
  })

  handle(p, function (err, res) {
    if (err) return callback(err)
    callback(null, res === 'true')
  })
}

/*************************** HELPER FUNCTIONS *********************************/

function bufListToString (list) {
  return list.map(function (v) {
    return v.toString()
  }).join('')
}

function handle (p, callback) {
  var out = []
  var err = []
  
  p.stdout.setEncoding('utf8')
  p.stderr.setEncoding('utf8')

  p.stdout.on('data', out.push.bind(out))
  p.stderr.on('data', err.push.bind(err))

  p.on('error', callback)
  p.on('close', function () {
    if (err.length) {
      callback(bufListToString(err).trim())
    } else {
      callback(null, bufListToString(out).trim())
    }
  })
}
