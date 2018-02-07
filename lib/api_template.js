
var {apiUrl, route} = require('./resource')
var util = require('./util');
var wrapper = util.wrapper;
var postJSON = util.postJSON;
var wrapUrl = util.wrapUrl
/**
 * 
 * @param {string} openId 
 * @param {string} templateId 
 * @param {object} options 
 * @param {function} callback 
 * 示例:
 * openId: 'OPENID' 
 * templateId: 'TEMPLATE_ID'
 * options: {
  "page": "index",          
  "form_id": "FORMID",         
  "data": {
      "keyword1": {
          "value": "339208499", 
          "color": "#173177"
      }, 
      "keyword2": {
          "value": "2015年01月05日 12:30", 
          "color": "#173177"
      }, 
      "keyword3": {
          "value": "粤海喜来登酒店", 
          "color": "#173177"
      } , 
      "keyword4": {
          "value": "广州市天河区天河路208号", 
          "color": "#173177"
      } 
  },
  "emphasis_keyword": "keyword1.DATA" 
}
 * 
 **/
exports.sendTemplate = function(openId, templateId, options, callback) {
  this.preRequest(this._sendTemplate, arguments)
}

exports._sendTemplate = function(openId, templateId, options, callback) {
  var data = Object.assign({
    'touser': openId,
    'template_id': templateId
  }, options)
  var url = wrapUrl(apiUrl + route.template.send, {access_token: this.token.accessToken})
  this.request(url, postJSON(data), wrapper(callback))
}