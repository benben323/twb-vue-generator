const crypto = require('./crypto')
const des_config = {
    alg: 'des-cbc',
    autoPad: true,
    key: 'L82V6ZVD',
    iv: [18, 52, 86, 120, 144, 171, 205, 239],
    inEncoding: 'base64',
    outEncoding: 'utf8'
}

module.exports =  {
    decrypt (data) {
        return crypto.des.decrypt(data, des_config)
    }
}
