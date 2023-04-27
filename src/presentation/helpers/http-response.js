const UnauthorizedError = require('../errors/unauthorized-error')
const ServerError = require('../errors/server-error')

class HttpResponse {
  static Ok (data) {
    return {
      statusCode: 200,
      body: data
    }
  }

  static BadRequest (error) {
    return {
      statusCode: 400,
      body: error
    }
  }

  static ServerError () {
    return {
      statusCode: 500,
      body: new ServerError()
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
