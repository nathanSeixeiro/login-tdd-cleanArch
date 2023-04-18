const LoginRouter = require('./login-router.js')
const MissingParamError = require('../helpers/missing-param-error.js')
const UnauthorizedError = require('../helpers/unauthorized-error.js')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('Should be return 400 if no email is provided', () => {
    const { sut } = makeSut()
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
    const { sut } = makeSut()
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
    const { sut } = makeSut()
    const httpRes = sut.route()
    expect(httpRes.statusCode).toBe(500)
  })

  test('Should be return 500 if no httpReq is provided', () => {
    const { sut } = makeSut()
    const httpRes = sut.route({})
    expect(httpRes.statusCode).toBe(500)
  })

  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpReq = {
      body: {
        email: 'any@email.com',
        password: 'any_pass'
      }
    }
    sut.route(httpReq)
    expect(authUseCaseSpy.email).toBe(httpReq.body.email)
    expect(authUseCaseSpy.password).toBe(httpReq.body.password)
  })

  test('Should return 401 when invalid credencials are provided', () => {
    const { sut } = makeSut()
    const httpReq = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_pass'
      }
    }
    const httpRes = sut.route(httpReq)
    expect(httpRes.statusCode).toBe(401)
    expect(httpRes.body).toEqual(new UnauthorizedError())
  })
})
