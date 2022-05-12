const req = require('express/lib/request')
const Joi = require('joi')

exports.validate = (request, response, next) => {
    let rules = Joi.object().keys({
        username: Joi.string().required(),
        nama_user: Joi.string().required(),
        password: Joi.string().required().min(8).alphanum()
    })

    let { error } = rules.validate(request.body)
    let valid = error == null
    if (!valid) {
        let errMessage = error.details.map(it => it.message).join(",")
        return response.json({
            message: error.details
        }, 422)
    }
    next()
}