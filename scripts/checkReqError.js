const {  validationResult } = require("express-validator")

module.exports = {
  errorMsg: (req, res, next) => {
    const valRes = validationResult(req)
    if (!valRes.isEmpty()) {
      let msg = "ОШИБКА ЗАПРОСА REQ! ПОЛЕ -> "
      valRes.errors.forEach(v => {
        msg += `${v.param},`
      })
      msg = msg.slice(0, -1)
      return res.status(400).send({
        msg
      })
    }
    next()
  }
}