/**
 * 授权验证中间件
 * 需在cookie parser之后使用
 * @param req
 * @param res
 * @param next
 */

module.exports = function () {
    return function (req, res, next) {
        next()
    }
}