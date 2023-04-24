const MissingParamError = require('./missing-param-error')
const UnauthorizedError = require('./unauthorized-error')

class HttpResponse {
  static Ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static BadRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static ServerError () {
    return {
      statusCode: 500
    }
  }

  static UnauthorizedError () {
    return {
      statusCode: 401,
      body: new UnauthorizedError()
    }
  }
}

module.exports = HttpResponse
