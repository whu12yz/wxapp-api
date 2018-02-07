
var API = require('./lib/api_common')
API.mixin(require('./lib/api_message'))

module.exports = API

// var api = new API('wx42fbe135435955f8', '64dd00bbc0a47fb3c4870835141d6ef9')
// 边风炜特约
// AppID(小程序ID) wx8074a2cd22551d16
// AppSecret(小程序密钥)  8e70cfebbb6b0bfa8b02cb1cc47bfec5
// 原始ID gh_fa531fd0b910

var api = new API('wx63c8c2a63b2a766a', 'deb5366ecf427a12986c9546f676c864')

api.sendMessage('okl4Hwc7YuHxPIdVAqAIzXcm9ejM', 'text', 'hello world', function(err, result) {
  if(err) console.log(err, 'error');
  console.log(result, 'data');
})

