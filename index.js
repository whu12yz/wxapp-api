
var API = require('./lib/api_common')
API.mixin(require('./lib/api_message'))
API.mixin(require('./lib/api_template'))

module.exports = API