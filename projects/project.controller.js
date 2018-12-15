const express = require('express');
const router = express.Router();
const projectService = require('./project.service');
// routes
router.post('/addProject', addProject);
router.post('/addProjectHistory', addProjectHistory);
router.post('/addProjectEntry', addProjectEntry);
router.put('/updateProject', updateProject);
router.put('/updateProjectHistory', updateProjectHistory);

module.exports = router;

function addProject(req, res, next) {
    projectService.addProject(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function addProjectHistory(req, res, next) {
    projectService.addProjectHistory(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function addProjectEntry(req, res, next) {
    projectService.addProjectEntry(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProject(req, res, next) {
    projectService.updateProject(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectHistory(req, res, next) {
    projectService.updateProjectHistory(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}