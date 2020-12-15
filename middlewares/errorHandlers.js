module.exports = (err, req, res, next) => {
  let status = err.status || 500
  let msg = err.msg || 'internal server error'
  if (err.name === 'SequelizeValidationError') {
    status = 400;
    let messages = err.errors.map(e => {
      return e.message
    })
    msg = messages.join(', ')
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    msg = 'Email has already been taken'
  }

  res.status(status).json({ msg })
}