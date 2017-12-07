export default {
	clone: function (obj) {
		var o;
		if (typeof obj == "object") {
			if (obj === null) {
				o = null;
			} else {
				if (obj instanceof Array) {
					o = [];
					for (var i = 0, len = obj.length; i < len; i++) {
						o.push(this.clone(obj[i]));
					}
				} else {
					o = {};
					for (var j in obj) {
						o[j] = this.clone(obj[j]);
					}
				}
			}
		} else {
			o = obj;
		}
		return o;
	},

	unique: function (items, filterOn) {
		let newItems = []

		if (Array.isArray(items)) {
			items.forEach(item => {
				if (!newItems.includes(item[filterOn])) {
					newItems.push(item[filterOn])
				}
			})
		}
		return newItems
	},

	disableBodyScroll: function () {
		document.body.style.overflowY = 'hidden'
	},

	enableBodyScroll: function () {
		document.body.style.overflowY = ''
	},

	isAndroid: function () {
		let userAgent = navigator.userAgent
		return (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1)
	},
	/**
	 * 手机号验证
	 * @param  String number 手机号
	 * @return Object 验证成功或失败
	 */
	validateMobileNumber: function (number) {
		if (number === '') {
			return {message: '请填写联系手机'}
		}
		let re = /^(13[0-9]|147|145|15[0-9]|17[0-9]|18[0-9])[0-9]{8}$/;
		if (!re.test(number)) {
			return {message: '联系手机不合法！'}
		}
		return undefined;
	},
	/**
	 * 判断闰年
	 * @param yy
	 * @returns {boolean}
	 */
	isLeapYear: function (yy) {
		if (((yy % 4) == 0) && ((yy % 100) != 0) || ((yy % 400) == 0)) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 计算年龄
	 * @param date
	 * @param flyDate
	 * @returns {number}
	 */
	checkAge: function (date, flyDate) {
		let yy = date.substr(0, 4)
		let mm = date.substr(4, 2)
		let dd = date.substr(6, 2)
		let main = "valid"

		if (date.indexOf('-') != -1) {
			yy = date.substr(0, 4)
			mm = date.substr(5, 2)
			dd = date.substr(8, 2)
		}

		if ((mm < 1) || (mm > 12) || (dd < 1) || (dd > 31) || (yy < 1) || (mm == "") || (dd == "") || (yy == "")) main = "invalid"
		else if (((mm == 4) || (mm == 6) || (mm == 9) || (mm == 11)) && (dd > 30)) main = "invalid"
		else if (mm == 2) {
			if (dd > 29) {
				main = "invalid"
			} else if ((dd > 28) && (!this.isLeapYear(yy))) {
				main = "invalid"
			}
		} else if ((yy > 9999) || (yy < 0)) main = "invalid";

		if (main == "valid") {
			var days = new Date(Date.parse(flyDate.replace(/-/g, "/")));

			var gdate = days.getDate();
			var gmonth = days.getMonth();
			var gyear = days.getFullYear();
			var age = gyear - yy;
			if ((mm == (gmonth + 1)) && (dd <= parseInt(gdate))) {
				age = age;
			} else {
				if (mm <= (gmonth)) {
					age = age;
				} else {
					age = age - 1;
				}
			}
			if (age == 0) age = age;
			return age;
		}
	},
	/**
	 * 乘机人新增成人判断
	 * @param cardtype
	 * @param cardno
	 * @param birth
	 * @param flyDate
	 * @returns {*}
	 */
	isAgeType: function (cardtype, cardno, birth, flyDate) {
		let year = ""
		let month = ""
		let day = ""
		if (cardtype === "身份证") {
			year = cardno.substr(6, 4);
			month = cardno.substr(10, 2);
			day = cardno.substr(12, 2)
		} else {
			if (birth.indexOf('-') != -1) {
				year = birth.substr(0, 4);
				month = birth.substr(5, 2);
				day = birth.substr(8, 2)
			} else {
				year = birth.substr(0, 4);
				month = birth.substr(4, 2);
				day = birth.substr(6, 2);
			}
		}
		var age = this.checkAge(year + month + day, flyDate);

		if (age >= 18) {
			return "AA"; //完全成人
		} else if (age < 18 && age >= 12) {
			return "A"; //成人
		} else if (age < 12 && age >= 5) {
			return "BB"; //儿童1
		} else if (age < 5 && age >= 2) {
			return "B"; //儿童2
		} else {
			return "C"; //婴儿
		}
	},
	/**
	 * 判断空对象
	 */
	isEmptyObject: function (obj) {
		for (let key in obj) {
			return false
		}
		return true
	},
	// 平台ID： 手Q  519  微信  501  小程序  502
	platId: function () {
		return 501
	},

	addCookie: function (name, value, day) {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + day);
		//设置失效时间
		document.cookie = escape(name) + '=' + value + ';path=/;expires=' + expireDate.toGMTString();
	},
	disableBodyScroll: function () {
		document.body.style.overflowY = 'hidden'
	},

	enableBodyScroll: function () {
		document.body.style.overflowY = ''
	},
	// 发票抬头验证
	checkInvoiceHead(obj){
		var arr = ['个人', '个人发票', '个人姓名', '差旅费', '我要报销', '公司', '飞机票', '机票', '行程单', '名字'];
		for (var i = 0; i < arr.length; i++) {
			if (obj == arr[i]) {
				this.isShowtipsDetail = true
				this.tipsText = '发票抬头不能为"' + obj + '"，请重新输入'
				return false;
			}
		}
		return true;
	},
	/**
	 * 发票抬头拦截emoji
	 */
	checkHeadEmoji: function(obj) {
		var regRangeEmoji = [
			'\ud83c[\udf00-\udfff]', 
			'\ud83d[\udc00-\ude4f]', 
			'\ud83d[\ude80-\udeff]'
		];
		var regEmoji = new RegExp(regRangeEmoji.join('|'), 'g')
		if (regEmoji.test(obj)) {
			return false
		}
		return true;
	},

	/**
	 * 返回到指定日期时的乘机人类型
	 * @param sDate 日期 格式 yyyy-MM-dd
	 * @param birthday 生日 格式 yyyy-MM-dd
	 * @return 1 成人  2 儿童 3 婴儿
	 */
	getPassengerType: function (sDate, sBirthday) {
		var sDate = sDate.replace(/-/g, "\/"),
			max = new Date(sDate),
			min = new Date(sDate),
			birthday = new Date(sBirthday.replace(/-/g, "\/"))


		max.setFullYear(max.getFullYear() - 12)

		min.setFullYear(min.getFullYear() - 2)

		// 生日在12年前或更前，即大于等于12岁
		if (max >= birthday) {
			return 1
		}

		// 2年前还未出生
		if (min < birthday) {
			return 3
		}

		return 2
	},
	/**
	 * 去除字符串中所有空格
	 * @param {string} str
	 * @return {string}
	 */
	trimall (str) {
		return str.replace(/\s/g, '')
	},
	/**
	 * 从身份中提取出生日期
	 * @param {string} certno 身份证号
	 * @returns {string} 出生日期 格式： yyyy-MM-dd
	 */
	distillBirth (certno) {
		var year = certno.substr(6, 4);
		var month = certno.substr(10, 2);
		var day = certno.substr(12, 2)
		return year + '-' + month + '-' + day
	},
	/**
	 * 从身份证中提取性别
	 * @param certno 身份证号
	 * @returns {number} 性别 1 男  0 女
	 */
	distillSex (certno) {
		return certno.substr(16, 1) % 2 == 0 ? 0 : 1
	},
	/**
	 * 将身份证以空格分隔 如：xxxxxx xxxxxxxx xxxx
	 * @param {string} certno
	 * @returns {string}
	 */
	sepcertno (certno) {
		if (!certno) {
			return ''
		}

		if (certno.length > 14) {
			return certno.substr(0, 6) + ' ' + certno.substr(6, 8) + ' ' + certno.substr(14, 4)
		}

		if (certno.length > 6) {
			return certno.substr(0, 6) + ' ' + certno.substr(6, 8)
		}

		return certno
	},
	setTitle: function (title) {
		document.title = title
		let iframe = document.createElement('iframe')
		iframe.setAttribute('style','display:none')
		iframe.setAttribute('src','/favicon.ico')
		iframe.onload = function(){
			setTimeout(function () {
				document.body.removeChild(iframe)
			}, 0)
		}

		document.body.appendChild(iframe)
	},
	userInfo: function () {
		let openid = this.getCookies("CooperateTcWxUser", "openid"),
			memberId = this.getCookies("CooperateTcWxUser", "MemberId"),
			key = this.getCookies("CooperateTcWxUser", "Key"),
			mid = this.getCookies("mid","");
		let data = {
			CooperateUserId: this.getCookies("CooperateTcWxUser", "openid") || "",
			openid: openid || "",
			MemberId: memberId || "",
			mid: mid || "",
			Key: key || ""
		}
		let info = {};
		// 获取用户信息
		if (data.openid) {
			info.openid = data.openid;
			info.memberid = encodeURIComponent(data.MemberId);
			info.mid = data.mid;
			info.sessionKey = this.md5(info.openid, true);
		}

		return info;
	},
	getCookies: function (keyVal, val) {
		let cookieVal = getCookieKey(keyVal), arr = [], valTemp;
		cookieVal = cookieVal && cookieVal.replace(/\s/g, "") || "";
		arr = cookieVal && cookieVal.split("&") || [];
		if (val == null || val == "") {
			if (arr.length == 1) {
				valTemp = cookieVal
			}
		}
		else {
			if (arr.length > 0) {
				for (var i = 0, lens = arr.length; i < lens; i++) {
					if (arr[i].split("=")[0] == val) {
						valTemp = arr[i].replace(/=/, "%C%C%").split("%C%C%")[1];
					}
				}
			}
		}
		function getCookieKey(keyVal) {
			var arr, reg = new RegExp("(^| )" + keyVal + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return arr[2];
			else
				return null;
		}

		return valTemp
	},
	/**
	 * 获取虚拟目录名称
	 * @return {[type]} [description]
	 */
	getWebSiteName(url){
		let name = url.match(/flightnew\d|flightnewtest\d|flightnew|flightnewtest/);
		name = name?name:'flightnew';
		return name;
	}

}
