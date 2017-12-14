module.exports = {
    api: 'http://leonidapi.17usoft.com/v1/leonid/static/object', // 狮子座上传接口地址
    userToken: '9aabb92304d27d8a084209e597a36053', // 工号+密码 的md5值
    projectId: '57a99bc60a23ea2c52a73212', // 狮子座中的项目id
    bucket: 'assets',
    directory: { // 上传到狮子座中的目录，配置不同环境不同目录
        product: 'flightnew',
        stage: 'flightnewtest',
		stage_test2: 'flightnewtest2'
    }
}