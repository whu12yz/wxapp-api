
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

/**
 * 获取小程序模板库标题列表
 * @param {number} offset 
 * @param {number} count 
 * @param {number} callback 
 */
exports.getTemplateLibList = function(offset, count, callback) {
  this.preRequest(this._getTemplateLibList, arguments)
}

exports._getTemplateLibList = function(offset, count, callback) {
  var url = wrapUrl(apiUrl + route.template.libList, {access_token: this.token.accessToken})
  var data = {
    offset,
    count
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 根据id获取模板信息
 * @param {string} id  
 * @param {funtion} callback 
 */
exports.getTemplateLibById = function(id, callback) {
  this.preRequest(this._getTemplateLibById, arguments)
}

exports._getTemplateLibById = function(id, callback) {
  var url = wrapUrl(apiUrl + route.template.libGet, {access_token: this.token.accessToken})
  var data = {
    id
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 组合模板并添加至帐号下的个人模板库
 * @param {string} id 
 * @param {array} keywordList 
 * @param {function} callback 
 */
exports.addTemplate = function(id, keywordList, callback) {
  this.preRequest(this._addTemplate, arguments)
}

exports._addTemplate = function(id, keywordList, callback) {
  var url = wrapUrl(apiUrl + route.template.add, {access_token: this.token.accessToken})
  var data = {
    id,
    keyword_id_list: keywordList
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 
 * @param {number} offset 
 * @param {number} count 
 * @param {function} callback 
 */
exports.getTemplateList = function(offset, count, callback) {
  this.preRequest(this._getTemplateList, arguments)
}

exports._getTemplateList = function(offset, count, callback) {
  var url = wrapUrl(apiUrl + route.template.list, {access_token: this.token.accessToken})
  var data = {
    offset,
    count
  }
  this.request(url, postJSON(data), wrapper(callback))
}

/**
 * 删除帐号下的某个模板
 * @param {string} templateId 
 * @param {function} callback 
 */
exports.deleteTemplate = function(templateId, callback) {
  this.preRequest(this._deleteTemplate, arguments)
}

exports._deleteTemplate = function(templateId, callback) {
  var url = wrapUrl(apiUrl + route.template.del, {access_token: this.token.accessToken})
  var data = {
    template_id: templateId
  }
  this.request(url, postJSON(data), wrapper(callback))
}