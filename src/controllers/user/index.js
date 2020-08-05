const base = require('../../base')
const User = require('../../models/user.js')
const Token = require('../../services/tokens')
module.exports.register = async (req) => {
    const { name, password, accountType, email, phone } = req.body;
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
    const jwt = Token.create({
        email: user.email,
        password: user.password,
        accountType: user.accountType,
        purpose: 'Verification'
    },
        { expiresIn: '7d', issuer: 'Blue-streak' }
    )
    await user.save().catch((e) => {
        throw new base.ResponseError(400, e.message)
    })
    const data = user.toJSON();
    delete data.password;
    return new base.Response(201, {
        message: "Account created successfully",
        data,
        error: false,
        jwt
    })
}
module.exports.getUsers = async () => {
    let userCollection;
    await User.find({},(err, result) => {
      if(err) throw new base.ResponseError(400, err.message)
      else {
        userCollection = result
      }
    });
    return new base.Response(201, {
      error: false,
      users: userCollection,
    });
}
module.exports.deleteUsers = async (req) => {
    const {_id} = req.body;
    let user = await User.findOne({_id});
    user.remove();
    try {
      await user.save()
    } catch (err) {
      throw new base.ResponseError(404, err.message);
    }
    return new base.Response(201, {
      error: false,
      message: 'User has been deleted successfully'
    });
}