const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  route (httpReq) {
    if (!httpReq || !httpReq.body) {
      return HttpResponse.ServerError()
    }

    const { email, password } = httpReq.body
    if (!email) {
      return HttpResponse.BadRequest('email')
    }
    if (!password) {
      return HttpResponse.BadRequest('password')
    }
  }
}

module.exports = LoginRouter
