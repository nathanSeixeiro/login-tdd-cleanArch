const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpReq) {
    if (!httpReq || !httpReq.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.ServerError()
    }
    const { email, password } = httpReq.body
    if (!email) {
      return HttpResponse.BadRequest('email')
    }
    if (!password) {
      return HttpResponse.BadRequest('password')
    }
    const acessToken = this.authUseCase.auth(email, password)
    if (!acessToken) {
      return HttpResponse.UnauthorizedError()
    }

    return HttpResponse.Ok({ acessToken })
  }
}

module.exports = LoginRouter
