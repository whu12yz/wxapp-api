const API = require('../../index')
const util = require('../../lib/util')
const postJSON = util.postJSON

describe('api_template', () => {
  let api
  let tempTemplate
  before(() => {
    api = new API('wx8074a2cd22551d16', '8e70cfebbb6b0bfa8b02cb1cc47bfec5')
  })
  it('sendTemplate request should return WxAPIError', (done) => {
    const openId = 'olucZ0d8bKEkscVsWdbnQ7MSeuuI'
    const templateId = 'bP-Zccd2JADnDozVTAzuW3mspDMkzuJnQKQQMMlh-Zc'
    const options = {
      title: 'title'
    }
    let requestSpy = sinon.spy(api, 'request')
    api.sendTemplate(openId, templateId, options, function(err, result) {
      const params = {
        'touser': openId,
        'template_id': templateId,
        'title': 'title'
      }
      expect(err.name).to.be.equal('WxAPIError')
      done()
    })
  })
  it('getTemplateLibList should return list', (done) => {
    const count = 10
    const offset = 0
    api.getTemplateLibList(offset, count, function(err, data) {
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      expect(data.list).to.be.an('array')
      done()
    })
  })
  it('getTemplateLibById should return id', (done) => {
    const id = 'AT0002'
    api.getTemplateLibById(id, function(err, data) {
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      expect(data.keyword_list).to.be.an('array')
      done()
    })
  })
  it('addTemplate should return template_id', (done) => {
    const id = 'AT0003'
    const keywordList = [1,2,3]
    api.addTemplate(id, keywordList, function(err, data) {
      tempTemplate = data.template_id
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      expect(data.template_id).to.be.a('string')
      done()
    })
  })
  it('getTemplateList should return list', (done) => {
    const offset = 0
    const count = 10
    api.getTemplateList(offset, count, function(err, data) {
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      expect(data.list).to.be.an('array')
      done()
    })
  })
  it('deleteTemplate tempTemplate should be ok', (done) => {
    api.deleteTemplate(tempTemplate, function(err, data) {
      expect(data).to.have.property('errmsg', 'ok')
      expect(data).to.have.property('errcode', 0)
      done()
    })
  })
})