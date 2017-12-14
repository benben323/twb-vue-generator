'use strict'
const fetch = require('node-fetch')
const querystring = require('querystring')

class Leonid {
    constructor (options) {
        this.params = {
            userToken: options.userToken,
            pId: options.projectId,
            bucketName: options.bucket
        }
        this.apiUrl = options.api
    }

    /***
     * 上传文件
     * @param {string} file 文件内容字符串 base64编码
     * @param {string} dirname 上传到狮子座中的路径，包括文件名称 如： flightnew/a.js
     * @returns {Promise}
     */
    upload (file, dirname) {
        let self = this

        return new Promise((resolve, reject) => {
            self.params.key = dirname
            self.params.file = file
            fetch(self.apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: querystring.stringify(self.params)
            }).then((res) => {
                return res.json()
            }).then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
        })
    }
}

module.exports = Leonid