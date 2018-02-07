module.exports = {
  apiUrl: 'https://api.weixin.qq.com/cgi-bin',
  route: {
    token: '/token',
    message: {
      send: '/message/custom/send' //发送客服消息
    },
    template: {
      send: '/message/wxopen/template/send', //发送模板消息
      libList: '/wxopen/template/library/list', //获取小程序模板库标题列表
      libGet: '/wxopen/template/library/get',  //获取某个模板标题id下的关键词库
      add: '/wxopen/template/add', //组合模板并添加至帐号下的个人模板库
      list: '/wxopen/template/list', //获取帐号下已存在的模板列表
      del: '/wxopen/template/del' //删除帐号下的某个模板
    }
  }
}