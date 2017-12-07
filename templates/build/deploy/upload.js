'use strict'
const fs = require('fs')
const file = require('./file')
const Leonid = require('./leonid')
const config = require('./config')
const path = require('path')

let leonid = new Leonid({
    userToken: config.userToken,
    projectId: config.projectId,
    bucket: config.bucket,
    api: config.api
})

let env = process.env.NODE_ENV || 'stage'

let dirname = config.directory[env]

/***
 * 上传狮子座
 * @param {stirng} file 需要上传的文件路径
 * @param {string} target 上传到狮子座的子目录
 */
function upload (filePath, target) {
    file.readFile(filePath).then((buffer) => {
        leonid.upload(buffer.toString('base64'), target).then((res) => {
            console.log(res)
            if(res.code === 0) {
                console.log(`${filePath}: success`)
            } else {
                throw new Error(`${filePath}: fail`)
            }
        }).catch((e) => {
            throw e
        })
    }).catch((e) => {
        throw e
    })
}


/**
 *
 * @param {string} base 需要上传文件所在的目录
 * @param {string} relative 所在目录的子目录（相对地址）
 * @param {string} ignore 不需要上传的文件
 */
function uploadRecu(base, relative) {
    let filePath = relative ? path.join(base, relative) : base
    let ignore = '.json|.html|.map|server-bundle'
    fs.readdirSync(filePath).forEach((item) => {
        let tempPath = path.resolve(filePath, item)
        if (fs.lstatSync(tempPath).isDirectory()) {
            if (relative) {
                uploadRecu(base, path.resolve(relative, item))
            } else {
                uploadRecu(base, item)
            }
        } else {
            if(new RegExp(ignore).test(item)) {
                return
            }
            if (relative) {
                upload(path.join(base, relative, item), path.join(dirname, relative, item).replace(/\\/g, '/'))

            } else {
                upload(path.join(base, item), dirname + '/' + item)
            }
        }
    })
}

module.exports = uploadRecu