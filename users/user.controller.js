const express = require('express');
const router = express.Router();
const userService = require('./user.service');
// routes
router.get('/getAllUserByName', getAllUserByName);
router.get('/getAllUserByempTypeID/:No', getAllUserByempTypeID);
router.post('/authenticate', authenticate);
//http://tphangout.com/angular-2-sending-mails-from-your-app/
//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34
//https://www.npmjs.com/package/emailjs
router.post('/sendMail', sendMail);
router.post('/register', register);
router.delete('/:id', _delete);
module.exports = router;

function getAllUserByName(req, res, next) {
    userService.getAllUserByName()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function sendMail(req, res, next) {
    userService.sendMail(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Error in sending email' }))
        .catch(err => next(err));
}

function getAllUserByempTypeID(req, res, next) {
    userService.getAllUserByempTypeID(req.params.No)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
