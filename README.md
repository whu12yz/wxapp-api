# wxapp-api
微信小程序node库


### quick start
```
npm install wxapp-api
var API = require('wxapp-api')
var api = new API(appid, secret)
api.sendMessage(openId, msgType, content, function(err, result){
  if(err) 
    console.log(err)
  doSomething...
})
```

如采用多节点分布式部署务必提供存取token的方法, token可以统一存在redis中
```
var API = require('wxapp-api')
var api = new API(appid, secret, getToken, saveToken)
var getToken = function(callback) {
    redis.get('APPID_KEY', function(err, reply){
    callback(reply)
  })
}
var saveToken = function(token, callback) {
  redis.set('APPID_KEY', token)
  callback(null)
}

api.sendText(openId, 'hello_world', function(err, result){

})
```

接口文档暂时没有来得及更新，接口调用方式比较简单，各位暂时先参考代码注释。

token维护部分代码参考自[wechat-api](https://github.com/node-webot/wechat-api)代码

