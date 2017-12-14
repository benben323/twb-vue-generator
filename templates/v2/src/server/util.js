let des = require('./crypto/des')
let _md5 = require('./crypto/md5')
let uuidv1 = require('uuid/v1');
module.exports = {
    parseCookie: function (value) {
        let resultObject = {}
        let items = value.split('&')
        items.forEach(function (item) {
            let splitIndex = item.indexOf('=')
            let key = item.substring(0, splitIndex)
            let value = item.substring(splitIndex + 1, item.length)
            resultObject[key] = value
        })

        return resultObject
    },
    getUserInfo: function (cookies) {
        const cookie_cooperate = 'CooperateTcWxUser'
        const cookie_opensource = 'cookieOpenSource'

        let userInfo = {'openid': '','sessionKey': ''}
        if (cookies[cookie_cooperate]) {
            userInfo = this.parseCookie(cookies[cookie_cooperate])
        }
        if (userInfo['openid'] === '') {
            if (cookies[cookie_opensource]) {
                let cookieOpenSource = this.parseCookie(cookies[cookie_opensource])
                if (cookieOpenSource['openid']) {
                    userInfo['openid'] = cookieOpenSource['openid']
                }
            }
        }
        // 将加密的Memberid解密一下
        if (userInfo['MemberId'] && userInfo['MemberId'] != '') {
            userInfo['mid'] = des.decrypt(userInfo['MemberId'])
        }

        if(cookies['sessionKey'] && cookies['sessionKey'] != ''){
			userInfo['sessionKey'] = cookies['sessionKey']
		}

		if(cookies['CNSEInfo']){
        	let cnseInfo = this.parseCookie(cookies['CNSEInfo'])
			console.log(`cnseInfo = ${JSON.stringify(cnseInfo)}`)
			if(cnseInfo['RefId']){
        		userInfo['refid'] = cnseInfo['RefId']
			}
		}

        return userInfo
    },
    getTraceId: function (cookies) {
        if(cookies && cookies["traceid"]) return cookies["traceid"]
        return uuidv1()
    },
    md5: function (data) {
        let salt = 'P7LW5I9ZLW15776X'
        return _md5(data, salt)
    }
}
