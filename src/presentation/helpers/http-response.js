const MissingParamError = require('./missing-param-error')

class HttpResponse {
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
}

module.exports = HttpResponse
