const User = require('../../models/user')
const base = require('../../base')
const Token = require('../../services/tokens')
module.exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    if (!email || !password) throw new base.ResponseError(400, "You must provide email and password")
    const user = await User.findByEmail(email).exec();
    if (!user) throw new base.ResponseError(400, "This email does not exist")
    if (!user.authenticate(password)) throw new base.ResponseError(400, "This password does not match this user")
    const jwt = Token.create({
        id: user.id,
        email: user.email,
        password: user.password,
        accountType: user.accountType,
        purpose: 'Verification'
    },
        { expiresIn: '7d', issuer: 'Blue-streak' }
    )
    const data = user.toJSON()
    delete data.password
    return new base.Response(200, {
        message: 'User logged in successfully',
        data,
        jwt
    })

}