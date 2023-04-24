const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpReq) {
    try {
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
    } catch (error) {
      // console.log(error)
      return HttpResponse.ServerError()
    }
  }
}

module.exports = LoginRouter
