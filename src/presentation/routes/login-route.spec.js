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

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = paramName
  }
}

describe('Login Router', () => {
  test('Should be return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const httpReq = {
      body: {
        password: 'any_password'
      }
    }
    const httpRes = sut.route(httpReq)
    expect(httpRes.statusCode).toBe(400)
    expect(httpRes.body).toEqual(new MissingParamError('email'))
  })

  test('Should be return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httpReq = {
      body: {
        email: 'any@email.com'
      }
    }
    const httpRes = sut.route(httpReq)
    expect(httpRes.statusCode).toBe(400)
    expect(httpRes.body).toEqual(new MissingParamError('password'))
  })

  test('Should be return 500 if no httpReq is provided', () => {
    const sut = new LoginRouter()
    const httpRes = sut.route()
    expect(httpRes.statusCode).toBe(500)
  })

  test('Should be return 500 if no httpReq is provided', () => {
    const sut = new LoginRouter()
    const httpRes = sut.route({})
    expect(httpRes.statusCode).toBe(500)
  })
})
