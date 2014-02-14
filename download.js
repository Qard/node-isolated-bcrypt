var https = require('https')
var fs = require('fs')

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

// Download file
download('bcrypt', 'https://raw.github.com/Qard/node-isolated-bcrypt/master/bcrypt-' + platform + '-' + arch)

/**************************** HELPER FUNCTIONS ********************************/
function piper (target) {
  return function (source) {
    source.pipe(target)
  }
}

function download (filename, url) {
  var file = fs.createWriteStream(filename)
  file.on('error', function (err) {
    throw new Error('Could not write to ' + filename)
  })

  var req = https.get(url, piper(file))
  req.on('error', function (err) {
    throw new Error('Could not download ' + bcrypt)
  })
}
