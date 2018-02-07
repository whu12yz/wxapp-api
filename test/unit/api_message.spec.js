const API = require('../../index')

describe('api_message', () => {
  let api,openId
  before(() => {
    openId = 'olucZ0d8bKEkscVsWdbnQ7MSeuuI'
    api = new API('wx8074a2cd22551d16', '8e70cfebbb6b0bfa8b02cb1cc47bfec5')

  })

  it('sendText should be ok', (done) => {
    api.sendText(openId, 'hello_world_unit_test', (err, data) => {
      if(err){
        expect(err.name).to.be.equal('WxAPIError')
        done()
      }
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      done()
    })
  })
  it('sendImage should be ok', (done) => {
    api.sendImage(openId, 'mediaId', (err, data) => {
      if(err) {
        expect(err.name).to.be.equal('WxAPIError')
        done()
      }
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      done()
    })
  })
  it('sendLink should be ok', (done) => {
    const link = {
      "title": "Happy Day",
      "description": "Is Really A Happy Day",
      "url": "URL",
      "thumb_url": "THUMB_URL"
    }
    api.sendLink(openId, link, (err, data) => {
      if(err) {
        expect(err.name).to.be.equal('WxAPIError')
        done()
      }
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      done()
    })
  })
  it('sendMiniProgramPage should be ok', (done) => {
    const options = {
      "title":"title",
      "pagepath":"pagepath",
      "thumb_media_id":"thumb_media_id"
    }
    api.sendMiniProgramPage(openId, options, (err, data) => {
      if(err) {
        expect(err.name).to.be.equal('WxAPIError')
        done()
      }
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      done()
    })
  })
})