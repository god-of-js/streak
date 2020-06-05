const base = require('../../base')
const User = require('../../models/user.js')
module.exports.register = async (req) => {
    const { name, password, accountType, email, phone } = req.body
    if (!name) throw new base.ResponseError(400, "You must provide Name")
    if (!email) throw new base.ResponseError(400, "You must provide Email")
    if (!password) throw new base.ResponseError(400, "You must provide Password")
    if (!phone) throw new base.ResponseError(400, "You must provide phone")
    if (!accountType) throw new base.ResponseError(400, "You must provide User Type")
    if ((password + "").length < 8) throw new base.ResponseError(400, "Password must be more than 8 characters")

    const emailExists = await User.findByEmail(email).exec();
    if (emailExists !== null) throw new base.ResponseError(400, "Email is already in use");
    const user = new User({
        name,
        password,
        accountType,
        email,
        phone,
        createdAt: Date.now()
    })
    await user.save().catch((e) => {
        throw new base.ResponseError(400, e.message)
    })
    const data = user.toJSON();
    delete data.password;
    return new base.Response(201, {
        message: "Account created successfully",
        ...data,
    })
}