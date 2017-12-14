const crypto = require('./crypto')

module.exports = function (data, salt) {
    let hash = crypto.md5(data, 'hex').toUpperCase() + salt
    return crypto.md5(hash, 'hex').toUpperCase()
}