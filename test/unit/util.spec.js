var util = require('../../lib/util')
describe('util', function() {
  describe('messageBody', function () {
    it('message body should return text', function () {
      var msgType = 'text'
      var content = 'hello_world'
      var openId = 'openId'
      expect(util.messageBody(openId, msgType, content)).to.deep.equal({
        'touser': openId,
        'msgtype': msgType,
        'text': {
          'content': content
        }
      })
    })
    it('message body should return media_id', function () {
      var msgType = 'image'
      var content = 'hello_world'
      var openId = 'openId'
      expect(util.messageBody(openId, msgType, content)).to.deep.equal({
        'touser': openId,
        'msgtype': msgType,
        'image': {
          'media_id': content
        }
      })
    })
    it('message body should return link', function () {
      var msgType = 'link'
      var content = { url: 'url' }
      var openId = 'openId'
      expect(util.messageBody(openId, msgType, content)).to.deep.equal({
        'touser': openId,
        'msgtype': msgType,
        'link': content
      })
    })
    it('message body should return miniprogrampage', function () {
      var msgType = 'miniprogrampage'
      var content = { path: '/index' }
      var openId = 'openId'
      expect(util.messageBody(openId, msgType, content)).to.deep.equal({
        'touser': openId,
        'msgtype': msgType,
        'miniprogrampage': content
      })
    })
  })

  describe('wrapUrl', function() {
    it('should return complete url', function() {
      var url = 'http://www.test.cn'
      var query = {
        a: 123,
        b: 'hello'
      }
      expect(util.wrapUrl(url, query)).to.equal('http://www.test.cn?a=123&b=hello')
    })
  })
})