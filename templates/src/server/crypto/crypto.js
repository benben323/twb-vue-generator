const crypto = require('crypto')

exports.des = {
    /**
     * des 解密
     * @param data {String | Buffer}
     * @param des_config {Object}
     */
    decrypt (data, des_config) {
        let key = new Buffer(des_config.key)
        let iv = new Buffer(des_config.iv ? des_config.iv : 0)
        let alg = des_config.alg
        let autoPad = des_config.autoPad
        let decipher = crypto.createDecipheriv(alg, key, iv)
        decipher.setAutoPadding(autoPad)
        let decrypted = decipher.update(data, des_config.inEncoding, des_config.outEncoding)
        decrypted += decipher.final('utf8')

        return decrypted
    }
}


exports.md5 = function (data, encoding) {
    return crypto.createHash('md5').update(data).digest(encoding)
}
