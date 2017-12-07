(function() {

  /**
   * 去掉日期的时间信息
   * @return {Date} 去掉时间信息的日期
   */
  Date.prototype.clearTime = function() {
    this.setHours(0)
    this.setMinutes(0)
    this.setSeconds(0)
    this.setMilliseconds(0)
    return this
  }

  /**
   * 日期天数加减
   * @param {int} value 需要加减的天数
   */
  Date.prototype.addDays = function(value) {
    this.setDate(this.getDate() + value * 1)
    return this
  }

  Date.prototype.addMonths = function(value) {
    this.setMonth(this.getMonth() + value * 1)
    return this
  }
  Date.prototype.addHours = function(value) {
    this.setHours(this.getHours() + value * 1)
    return this
  }

  Date.prototype.firstDayOfMonth = function() {
    this.setDate(1)
    return this
  }

  Date.today = function() {
    return new Date().clearTime()
  }

  Date.prototype.diff = function(otherDate) {
    let time = otherDate.getTime() - this.getTime();
    return Math.floor(time/(24*60*60*1000))
  }

  Date.prototype.clone = function() {
    let time = this.getTime()
    return new Date(time)
  }
  /**
  * 格式化时间
  * @param format 格式化 "yyyy-MM-dd hh:mm:ss www"
  * @returns {string} 格式化后字符串
  */
  Date.prototype.format = function(format) {
    let o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
    };
    var w = [
      ['日', '一', '二', '三', '四', '五', '六'],
      ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    ];

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(w+)/.test(format)) {
      format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][this.getDay()]);
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  }
/**
* 计算间隔时间
* @param {[type]} cDate [description]
* @param {[type]} mode  [description]
*/
  Date.prototype.dayDiff = function(data){
       try{
           data.getFullYear();
       }catch(e){
           return(0);
       }
       var base =24*60*60*1000;
       var result = Math.abs(this - data)/base;
       return(parseInt(result));
   }
   /**
    * 比较时间
    * @param  {[type]} date1 [description]
    * @param  {[type]} date2 [description]
    * @return {[type]}       [description]
    */
   Date.prototype.compareDate = function(date1,date2){
    date1 = new Date(date1.replace(/\-/g, "\/"));
    date2 = new Date(date2.replace(/\-/g, "\/"));
    return date1 - date2;
   }

})()
