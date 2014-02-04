# isolated-bcrypt

This is a dirty, dirty hack around bcrypt being horribly broken in node 0.11.
You probably shouldn't use this in production.

# Recommended usage

    var bcrypt;
    try {
      bcrypt = require('bcrypt')
    } catch (e) {
      bcrypt = require('isolated-bcrypt')
    }

    bcrypt.hash(password, rounds, function (err, hashed) {
      bcrypt.compare(password, hashed, function (err, same) {
        console.log('passwords match?', same)
      })
    })

# Notes
I haven't bothered implementing the longer genSalt method. Nag me if you think
you need it.