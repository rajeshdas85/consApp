const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Email = require("emailjs/email");
const User = db.User;

//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34

module.exports = {
    create,
    authenticate,
    getAllUserByempTypeID,
    getAllUserByName,
    delete: _delete,
    sendMail,
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
    return await User.find().select({ "fullName": 1, '_id': 1 }).sort({ $natural: -1 });
}


async function sendMail(email) {
    //email="rajesh.das85@gmail.com";
    var element = JSON.stringify(email);
    var stringify = JSON.parse(element);
    const emailID = stringify['email'];
    console.log(emailID);
    const server = Email.server.connect({
        user: "test@sandboxabd93e8dff7c4325a8159c941c28da2f.mailgun.org",
        password: "rajeshdas123",
        host: "smtp.mailgun.org",
        ssl: true
    });
    // console.log(server);
    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        text: "Welcome to my demo app",
        from: "smtp.mailgun.org",
        to: emailID,
        subject: "Welcome mail"
    }, function (err, message) {
        if (err)
            console.log(err);
        // else
        //     return res.json({ success: true, msg: 'sent' });
    });



}
