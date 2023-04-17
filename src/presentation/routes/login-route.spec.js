class LoginRouter {
  route (httpReq) {
    if (!httpReq.body.email || !httpReq.body.password) {
      return { statusCode: 400 }
    }
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
  })

  test('Should be return 400 if no password is provided', () => {
    const sut = new LoginRouter()
    const httpReq = {
      body: {
        password: 'any@email.com'
      }
    }
    const httpRes = sut.route(httpReq)
    expect(httpRes.statusCode).toBe(400)
  })
})
