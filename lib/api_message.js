
var {apiUrl, route} = require('./resource')
var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var wrapUrl = util.wrapUrl
var messageBody = util.messageBody

exports.sendText = function(openId, text, callback) {
  this.preRequest(this._sendText, arguments)
}
/**
 * 发送文本消息
 * @param {string} openId 
 * @param {string} text 
 * @param {function} callback 
 */
exports._sendText = function(openId, text, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  var data = messageBody(openId, 'text', text)
  this.request(url, postJSON(data), wrapper(callback))
}

exports.sendImage = function(openId, mediaId, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  this.preRequest(this._sendImage, arguments)
}

/**
 * 发送图片消息
 * @param {string} openId 
 * @param {string} mediaId 
 * @param {function} callback 
 */
exports._sendImage = function(openId, mediaId, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  var data = messageBody(openId, 'image', mediaId)
  this.request(url, postJSON(data), wrapper(callback))
}

exports.sendLink = function(openId, link, callback) {
  this.preRequest(this._sendLink, arguments)
}

/**
 * 发送图文链接
 * @param {string} openId 
 * @param {object} link 
 * @param {function} callback 
 */
exports._sendLink = function(openId, link, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  var data = messageBody('link', link)
  this.request(url, postJSON(data), wrapper(callback))
}

exports.sendMiniProgramPage = function(openId, miniProgramPage, callback) {
  this.preRequest(this._sendMiniProgramPage, arguments)
}

/**
 * 发送小程序卡片
 * @param {string} openId 
 * @param {object} miniProgramPage 
 * @param {function} callback 
 */
exports._sendMiniProgramPage = function(openId, miniProgramPage, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  var data = messageBody('miniprogrampage', miniProgramPage)
  this.request(url, postJSON(data), wrapper(callback))
}

exports.sendMessage = function(openId, msgType, content, callback) {
  this.preRequest(this._sendMessage, arguments)
}

/**
 * 统一客服消息发送接口,支持各类型消息发送
 * @param {string} openId 
 * @param {string} msgType enum('text', 'image', 'link', 'miniprogrampage')
 * @param {string, object} content 
 * @param {function} callback 
 */
exports._sendMessage = function(openId, msgType, content, callback) {
  var url = wrapUrl(apiUrl + route.message.send, {access_token: this.token.accessToken})
  var data = messageBody(openId, msgType, content)
  this.request(url, postJSON(data), wrapper(callback))
}