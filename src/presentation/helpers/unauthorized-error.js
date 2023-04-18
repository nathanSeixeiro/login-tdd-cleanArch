module.exports = class UnauthorizedError extends Error {
  constructor (paramName) {
    super('Not Allowed Acess')
    this.name = 'UnauthorizedError'
  }
}
