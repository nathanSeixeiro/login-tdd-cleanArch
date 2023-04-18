const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

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

    this.authUseCase.auth(email, password)
    return {
      statusCode: 401
    }
  }
}

module.exports = LoginRouter
