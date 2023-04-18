class LoginRouter {
  route (httpReq) {
    if(!httpReq) return { statusCode: 500 }

    if(!httpReq.body) return { statusCode: 500 }

    const {email, password} = httpReq.body
    if (!email || !password) return { statusCode: 400 }
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
  
  test('Should be return 500 if no httpReq is provided', () =>{
    const sut = new LoginRouter()
    const httpRes = sut.route()
    expect(httpRes.statusCode).toBe(500)
  })
  
  test('Should be return 500 if no httpReq is provided', () =>{
    const sut = new LoginRouter()
    const httpRes = sut.route({})
    expect(httpRes.statusCode).toBe(500)
  })


})
