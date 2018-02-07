var {apiUrl, route} = require('./resource')
var urllib = require('urllib')
var util = require('./util')
var _ = require('lodash')
var wrapUrl = util.wrapUrl
var wrapper = util.wrapper

var AccessToken = function (accessToken, expireTime) {
  if (!(this instanceof AccessToken)) {
    return new AccessToken(accessToken, expireTime);
  }
  this.accessToken = accessToken;
  this.expireTime = expireTime;
};
AccessToken.prototype.isValid = function () {
  return !!this.accessToken && (Date.now()) < this.expireTime;
}

var API = function(appid, secret, getToken, saveToken) {
  this.appid = appid
  this.secret = secret
  this.getToken = getToken || function (callback) {
    callback(null, this.store)
  }
  this.saveToken = saveToken || function(token, callback) {
    this.store = token
    callback(null)
  }
  this.defaults = {};
}

API.prototype.request = function(url, opts, callback) {
  var options = {}
  Object.assign(options, this.defaults)
  if(typeof options === 'function') {
    callback = opts
    opts = {}
  }
  //添加传入的option配置，合并headers
  _.forEach(opts, function(value, key) {
    if(key !== 'headers') {
      options[key] = value
    }
    if(key === 'headers') {
      Object.assign((options.headers || (options.headers = {})), opts.headers)
    }
  })
  urllib.request(url, options, callback)
}

API.prototype.setOpts = function (opts) {
  this.defaults = opts;
}



API.prototype.getAccessToken = function (callback) {
  var that = this;
  var url = wrapUrl(apiUrl + route.token, {appid: this.appid, secret: this.secret, grant_type: 'client_credential'})
  console.log(url);
  this.request(url, {dataType: 'json'}, wrapper(function (err, data) {
    if (err) {
      return callback(err);
    }
    //设置失效时间，提前10s
    var expireTime = (Date.now()) + (data.expires_in - 10) * 1000;
    var token = AccessToken(data.access_token, expireTime);
    console.log(token);
    that.saveToken(token, function (err) {
      if (err) {
        return callback(err);
      }
      callback(err, token);
    });
  }))
}

API.mixin = function (obj) {
  _.forEach(obj, function(value, key) {
    if(API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: ' + key);
    }
    API.prototype[key] = value
  })
}

API.prototype.preRequest = function (method, args, retryed) {
  var that = this;
  var callback = args[args.length - 1];
  // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
  that.getToken(function (err, token) {
    if (err) {
      return callback(err);
    }
    var accessToken;
    // 有token并且token有效直接调用
    if (token && (accessToken = AccessToken(token.accessToken, token.expireTime)).isValid()) {
      // 暂时保存token
      that.token = accessToken;
      if (!retryed) {
        var retryHandle = function (err, data, res) {
          // 40001 重试
          if (data && data.errcode && data.errcode === 40001) {
            return that.preRequest(method, args, true);
          }
          callback(err, data, res)
        };
        // 替换callback
        var newargs = Array.prototype.slice.call(args, 0, -1);
        newargs.push(retryHandle);
        method.apply(that, newargs);
      } else {
        method.apply(that, args);
      }
    } else {
      // 使用appid/appsecret获取token
      that.getAccessToken(function (err, token) {
        // 如遇错误，通过回调函数传出
        if (err) {
          return callback(err);
        }
        // 暂时保存token
        that.token = token;
        method.apply(that, args);
      });
    }
  });
};

API.accessToken = AccessToken

module.exports = API
