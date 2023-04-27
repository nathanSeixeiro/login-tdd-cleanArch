module.exports = class ServerError extends Error {
  constructor (paramName) {
    super('Sorry, its happend an Internal error, please try again')
    this.name = 'ServerError'
  }
}
