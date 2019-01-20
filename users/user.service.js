const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34

module.exports = {
    create,
    authenticate,
    getAllUserByempTypeID,
    getAllUserByName,
    delete: _delete,
};
async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, "123456789");
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
async function getAllUserByempTypeID(No) {
    return await User.find({ "empTypeId": No });//.select("firstName");
}
async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'email ID "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        // console.log('addeded'+user);
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function getAllUserByName() {
    console.log("dsdf");
    return await User.find().select({"firstName":1,'_id':1}).sort({ $natural: -1 });
}
