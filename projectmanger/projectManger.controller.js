const express = require('express');
const router = express.Router();
const projectManager = require('./projectManager.service');
// routes
router.post('/addProjectManager', addProjectManager);
module.exports = router;

function addProjectManager(req, res, next) {
    projectManager.addProjectManager(req.body)
         .then(() => res.json({}))
        .catch(err => next(err));
}
