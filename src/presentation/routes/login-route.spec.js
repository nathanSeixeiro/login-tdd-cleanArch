const LoginRouter = require('./login-router.js')
const MissingParamError = require('../helpers/missing-param-error.js')
const UnauthorizedError = require('../helpers/unauthorized-error.js')
const ServerError = require('../helpers/server-error.js')

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase()
  authUseCaseSpy.acessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    async auth (email, password) {
      this.email = email
      this.password = password
      return this.acessToken
    }
  }
  return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy {
    async auth () {
      throw new Error()
    }
  }
  return new AuthUseCaseSpy()
}

describe('Login Router', () => {
  test('Should be return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        password: 'any_password'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(400)
    expect(httpRes.body).toEqual(new MissingParamError('email'))
  })

  test('Should be return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        email: 'any@email.com'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(400)
    expect(httpRes.body).toEqual(new MissingParamError('password'))
  })

  test('Should be return 500 if no httpReq is provided', async () => {
    const { sut } = makeSut()
    const httpRes = await sut.route()
    expect(httpRes.statusCode).toBe(500)
    expect(httpRes.body).toEqual(new ServerError())
  })

  test('Should be return 500 if no httpReq is provided', async () => {
    const { sut } = makeSut()
    const httpRes = await sut.route({})
    expect(httpRes.statusCode).toBe(500)
    expect(httpRes.body).toEqual(new ServerError())
  })

  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpReq = {
      body: {
        email: 'any@email.com',
        password: 'any_pass'
      }
    }
    await sut.route(httpReq)
    expect(authUseCaseSpy.email).toBe(httpReq.body.email)
    expect(authUseCaseSpy.password).toBe(httpReq.body.password)
  })

  test('Should return 401 when invalid credencials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.acessToken = null
    const httpReq = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_pass'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(401)
    expect(httpRes.body).toEqual(new UnauthorizedError())
  })

  test('Should return 200 when valid credencials are provided', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpReq = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_pass'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(200)
    expect(httpRes.body.acessToken).toEqual(authUseCaseSpy.acessToken)
  })

  test('Should return 500 if no AuthUseCase is provided', async () => {
    const sut = new LoginRouter()
    const httpReq = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_pass'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(500)
    expect(httpRes.body).toEqual(new ServerError())
  })

  test('Should return 500 if AuthUseCase hasnt auth method', async () => {
    const sut = new LoginRouter({})
    const httpReq = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_pass'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(500)
    expect(httpRes.body).toEqual(new ServerError())
  })

  test('Should return 500 if AuthUseCase throws', async () => {
    const authUseCaseSpy = makeAuthUseCaseWithError()
    authUseCaseSpy.acessToken = 'valid_token'
    const sut = new LoginRouter(authUseCaseSpy)
    const httpReq = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_pass'
      }
    }
    const httpRes = await sut.route(httpReq)
    expect(httpRes.statusCode).toBe(500)
  })
})
