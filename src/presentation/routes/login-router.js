const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpReq) {
    try {
      const { email, password } = httpReq.body
      if (!email) {
        return HttpResponse.BadRequest(new MissingParamError('email'))
      }
      if (!password) {
        return HttpResponse.BadRequest(new MissingParamError('password'))
      }
      const acessToken = await this.authUseCase.auth(email, password)
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
