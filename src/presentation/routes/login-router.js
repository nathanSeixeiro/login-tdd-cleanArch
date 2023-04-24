const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')
const InvalidParamError = require('../helpers/invalid-param-error.js')

class LoginRouter {
  constructor (authUseCase, emailValidator) {
    this.authUseCase = authUseCase
    this.emailValidator = emailValidator
  }

  async route (httpReq) {
    try {
      const { email, password } = httpReq.body
      if (!email) {
        return HttpResponse.BadRequest(new MissingParamError('email'))
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.BadRequest(new InvalidParamError('email'))
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
