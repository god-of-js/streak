const v = require('../../services/validator.js')

module.exports.register = async req => {
    const { name, password, userType, email, phone, country } = req.body
    v.allExist(
        'You must Provide all the following Name, password, User Type, Email, Phone and Country',
        name,
        password,
        userType,
        email,
        phone,
        country
    ).isEmail('Email is not valid', email)
}