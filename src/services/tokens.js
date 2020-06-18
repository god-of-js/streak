const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = process.env
module.exports = {
    create: (payload, options = {}) => {
        return jwt.sign(payload, JWT_SECRET_KEY, options)
    },
     decode: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET_KEY)
        } catch {
            return null
        }
    }

}