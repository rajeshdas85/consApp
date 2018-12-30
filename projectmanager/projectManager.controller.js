const express = require('express');
const router = express.Router();
const projectManager = require('./projectManager.service');
// routes
router.get('/getPMByName', getPMByName);
router.post('/addProjectManager', addProjectManager);
module.exports = router;

function addProjectManager(req, res, next) {
    projectManager.addProjectManager(req.body)
         .then(() => res.json({}))
        .catch(err => next(err));
}
function getPMByName(req, res, next) {
    projectManager.getPMByName()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}