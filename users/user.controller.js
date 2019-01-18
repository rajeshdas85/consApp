const express = require('express');
const router = express.Router();
const userService = require('./user.service');
// routes
router.get('/getAllUserByempTypeID/:No', getAllUserByempTypeID);
router.post('/authenticate', authenticate);
router.post('/register', register);
module.exports = router;


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
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
