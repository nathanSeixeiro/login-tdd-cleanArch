class LoginRouter {
  route (req) {
    if (!req.body.email) {
      return { statusCode: 400 }
    }
  }
}

describe('Login Router', () => {
  test('Should be return 400 if no email is provided', () => {
    const sut = new LoginRouter()
    const req = {
      body: {
        passw: 'any'
      }
    }
    const res = sut.route(req)
    expect(res.statusCode).toBe(400)
  })
})
