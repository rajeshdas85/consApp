const express = require('express');
const router = express.Router();
const projectService = require('./project.service');
// routes
router.get('/', getLastAddProduct);
router.get('/getLastAddProjectEntry', getLastAddProjectEntry);
router.get('/getAllProjectHistory', getAllProjectHistory);
router.get('/getProjectDtlById', getProjectDtlById);
router.get('/pileNo/:pileNo', getProjectRecordingDtlByPilno);
//router.get('/:getLastAddProduct', getLastAddProduct);
router.post('/addProject', addProject);
router.post('/addProjectHistory', addProjectHistory);
router.post('/addProjectEntry', addProjectEntry);
router.post('/addProjectRecording', addProjectRecording);
router.put('/updateProject', updateProject);
router.put('/updateProjectHistory', updateProjectHistory);
router.put('/updateProjectRecording', updateProjectRecording);
module.exports = router;

function getProjectDtlById(req, res, next) {
    projectService.getProjectDtlById(req.params.id)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}

function getProjectRecordingDtlByPilno(req, res, next) {
    projectService.getProjectRecordingDtlByPilno(req.params.pileNo)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}
    function getLastAddProduct(req, res, next) {
    projectService.getLastAddProduct()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

    function getLastAddProjectEntry(req, res, next) {
    projectService.getLastAddProjectEntry()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}
    function getAllProjectHistory(req, res, next) {
    projectService.getAllProjectHistory()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}



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