const LoginRouter = require('./login-router.js')
const MissingParamError = require('../helpers/missing-param-error.js')

const makeSut = () => {
  return new LoginRouter()
}

describe('Login Router', () => {
  test('Should be return 400 if no email is provided', () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
    const httpRes = sut.route()
    expect(httpRes.statusCode).toBe(500)
  })

  test('Should be return 500 if no httpReq is provided', () => {
    const sut = makeSut()
    const httpRes = sut.route({})
    expect(httpRes.statusCode).toBe(500)
  })
})
