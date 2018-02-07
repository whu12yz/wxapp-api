var qs = require('querystring')
exports.postJSON = function(data) {
  return {
    dataType: 'json',
    type: 'POST',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }
}

exports.messageBody = function(openId, msgType, content) {
  var message = {
    'touser': openId,
    'msgtype': msgType
  }
  if(msgType === 'text') {
    content = {'content': content}
  }
  if(msgType === 'image') {
    content = {'media_id': content}
  }
  message[msgType] = content 
  return message
}

exports.wrapUrl = function(url, query) {
  return `${url}?${qs.stringify(query)}`
}

exports.wrapper = function (callback) {
  return function (err, data, res) {
    callback = callback || function () {}
    if (err) {
      err.name = 'WxAPI' + err.name
      return callback(err, data, res)
    }
    if (data && data.errcode) {
      err = new Error(data.errmsg)
      err.name = 'WxAPIError'
      err.code = data.errcode
      return callback(err, data, res)
    }
    if (data == null) {
      err = new Error('No data received.')
      err.name = 'WxAPIError'
      err.code = -1
      return callback(err, data, res)
    }
    callback(null, data, res)
  }
}
