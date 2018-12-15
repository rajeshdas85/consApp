const express = require('express');
const router = express.Router();
const projectService = require('./project.service');
// routes
router.post('/addProject', addProject);
router.post('/addProjectHistory', addProjectHistory);
router.post('/addProjectEntry', addProjectEntry);
router.post('/addProjectEntry', addProjectRecording);
router.put('/updateProject', updateProject);
router.put('/updateProjectHistory', updateProjectHistory);
router.put('/updateProjectRecording', updateProjectRecording);
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
function addProjectRecording(req, res, next) {
    projectService.addProjectRecording(req.body)
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
function updateProjectRecording(req, res, next) {
    projectService.updateProjectRecording(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}