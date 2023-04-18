class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = paramName
  }
}

module.exports = MissingParamError
