const express = require('express');
const router = express.Router();
const projectService = require('./project.service');
// routes
//Project API Start
router.get('/', getLastAddProduct);
router.post('/addProject', addProject);
router.get('/getProjectDtlById', getProjectDtlById);
router.get('/getAllProjects', getAllProjects);

router.get('/getAllProjectsSumTotal', getAllProjectsSumTotal);
router.get('/getAllProjectsCount', getAllProjectsCount);
//Example : https://rkec.herokuapp.com/projects/getAllProjects
router.get('/projId/:projId', getPillingDetailsByProjId);
router.put('/updateProject', updateProject);
router.put('/updateProjectwithInitialVal', updateProjectwithInitialVal);

//Project API END
//Project user mapping  API Start
router.get('/getProjectDtlByLoginId/:ids', getProjectDtlByLoginId);
router.get('/getProjectDtlByLoginIdWithAggregate', getProjectDtlByLoginIdWithAggregate);
router.get('/getAllMappingProject', getAllMappingProject);
router.get('/getMappingProjectByempId/:empId', getMappingProjectByempId);
router.post('/mapProjectUser', mapProjectUser);
router.delete('/deleteProjectMapping/id/:id', deleteProjectMapping);
//http://localhost:8080/projects/getMappingStaffDtlsByProject/5c485a0824e41b00173b8e96
router.get('/getMappingStaffDtlsByProject/:projectId', getMappingStaffDtlsByProject);

//

// Project Entry API Start
router.get('/getLastAddedProjectEntry', getLastAddedProjectEntry);
router.get('/getAllAddedProjectEntry', getAllAddedProjectEntry);
/* 
    Get by project entry by No
    --------------------------
    1- inProgress Boaring
    2-Completed Boaring
    3-Cage InProgress
    4-Cage Completed
    5-ConcretePouring In Progress
    6-ConcretePouring Completed 
    7-Pilling Completed
*/
router.get('/getAllProjectEntryInProgress', getAllProjectEntryInProgress);
router.post('/addProjectEntry', addProjectEntry);
router.put('/updateProjectEntry', updateProjectEntry);
router.put('/updateProjectEntryCageLowering', updateProjectEntryCageLowering);
router.put('/updateProjectEntryConcretePouring', updateProjectEntryConcretePouring);
router.put('/updateProjectEntryFinal', updateProjectEntryFinal);
//Project Entry API END


// Project History API Start
router.get('/getAllProjectHistoryBoringComplete', getAllProjectHistoryBoringComplete);
router.get('/getAllProjectHistory/uniqueId/:uniqueId', getAllProjectHistory);
//Example : https://rkec.herokuapp.com/projects/projId/5c2d9e3c3682fc4ae09e20ae
//Example : https://rkec.herokuapp.com/projects/getProjectHistoryDtlByPileId/pileNo/PP-8f700aef-2ec9-85ae-0745-d4c71330bfc2
router.get('/getProjectHistoryDtlByPileId/pileNo/:pileNo', getProjectHistoryDtlByPileId);
router.post('/addProjectHistory', addProjectHistory);
router.put('/updateProjectHistory', updateProjectHistory);
router.put('/updateProjectHistoryUsingEndBoringtime', updateProjectHistoryUsingEndBoringtime);
router.put('/updateProjectHistoryFinal', updateProjectHistoryFinal);
router.put('/updateProjectHistoryconcretePourEndTime', updateProjectHistoryconcretePourEndTime);
router.put('/updateProjectHistorycageLoweringEndTime', updateProjectHistorycageLoweringEndTime);
router.put('/cageLoweringQtyProjectHistoryUpdate', cageLoweringQtyProjectHistoryUpdate);
router.put('/concretePouringQtyProjectHistoryUpdate', concretePouringQtyProjectHistoryUpdate);
router.put('/updateProjectHistoryfoundinglevel', updateProjectHistoryfoundinglevel);
//These 3 below api to be change 
//1)from  totalBoringTime  to totalBoringTimeHistoryUpdate
//2)from  cageLoweringQtyUpdate  to cageLoweringQtyHistoryUpdate
//3)from  concretePouringQtyUpdate  to concretePouringQtyHistoryUpdate
router.put('/totalBoringTime', totalBoringTime);
router.put('/cageLoweringQtyUpdate', cageLoweringQtyUpdate);
router.put('/concretePouringQtyUpdate', concretePouringQtyUpdate);
// Project History API End

// Project Recording API Start
router.get('/pileNo/:pileNo', getProjectRecordingDtlByPilno);
router.post('/addProjectRecording', addProjectRecording);
router.put('/updateProjectRecording', updateProjectRecording);
router.post('/addProjectRecordingIngInBulk', addProjectRecordingIngInBulk);

// Project Recording API End


// Project Pilling API Start
router.get('/getPilingCutOffLevel/:pileNo', getPilingCutOffLevel);
// Project Pilling API End


// Project BOM API Start
router.get('/getAllAddedProjectBOMByProjectID/:projId', getAllAddedProjectBOMByProjectID);
router.post('/addProjectBOM', addProjectBOM);
router.put('/updateProjectBOM', updateProjectBOM);
router.put('/updateProjectBOMByStatus', updateProjectBOMByStatus);
// Project BOM API END

module.exports = router;

function getProjectDtlById(req, res, next) {
    projectService.getProjectDtlById(req.params.id)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}


function deleteProjectMapping(req, res, next) {
    // console.log("enter"+req.params.id);
    projectService.deleteProjectMapping(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getProjectDtlByLoginId(req, res, next) {
    projectService.getProjectDtlByLoginId(req.params.ids)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}

function getProjectDtlByLoginIdWithAggregate(req, res, next) {
    projectService.getProjectDtlByLoginIdWithAggregate()
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}
    
function getMappingProjectByempId(req, res, next) {
    projectService.getMappingProjectByempId(req.params.empId)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}
function getMappingStaffDtlsByProject(req, res, next) {
    projectService.getMappingStaffDtlsByProject(req.params.projectId)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}










function getProjectHistoryDtlByPileId(req, res, next) {
    projectService.getProjectHistoryDtlByPileId(req.params.pileNo)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}

function getProjectRecordingDtlByPilno(req, res, next) {
    projectService.getProjectRecordingDtlByPilno(req.params.pileNo)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}

function getPillingDetailsByProjId(req, res, next) {
    projectService.getPillingDetailsByProjId(req.params.projId)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}
function getLastAddProduct(req, res, next) {
    projectService.getLastAddProduct()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}
function getAllProjectEntryInProgress(req, res, next) {
    projectService.getAllProjectEntryInProgress()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getAllProjectHistoryBoringComplete(req, res, next) {
    projectService.getAllProjectHistoryBoringComplete()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getLastAddedProjectEntry(req, res, next) {
    projectService.getLastAddedProjectEntry()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}


function getAllAddedProjectBOMByProjectID(req, res, next) {
    projectService.getAllAddedProjectBOMByProjectID(req.params.projId)
        .then(projectsBOM => res.json(projectsBOM))
        .catch(err => next(err));
}




function getAllProjectHistory(req, res, next) {
    projectService.getAllProjectHistory(req.params.uniqueId)
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getAllProjects(req, res, next) {
    projectService.getAllProjects()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}
function getAllProjectsSumTotal(req, res, next) {
    projectService.getAllProjectsSumTotal()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}

function getAllProjectsCount(req, res, next) {
    projectService.getAllProjectsCount()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}
function getAllMappingProject(req, res, next) {
    projectService.getAllMappingProject()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}



function addProject(req, res, next) {
    projectService.addProject(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function mapProjectUser(req, res, next) {
    projectService.mapProjectUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function addProjectBOM(req, res, next) {
    projectService.addProjectBOM(req.body)
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
function addProjectRecordingIngInBulk(req, res, next) {
    projectService.addProjectRecordingIngInBulk(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProject(req, res, next) {
    projectService.updateProject(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
    function updateProjectwithInitialVal(req, res, next) {
    projectService.updateProjectwithInitialVal(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectBOM(req, res, next) {
    projectService.updateProjectBOM(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectBOMByStatus(req, res, next) {
    projectService.updateProjectBOMByStatus(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}



function updateProjectHistory(req, res, next) {
    projectService.updateProjectHistory(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectHistoryUsingEndBoringtime(req, res, next) {
    projectService.updateProjectHistoryUsingEndBoringtime(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectRecording(req, res, next) {
    projectService.updateProjectRecording(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectEntry(req, res, next) {
    projectService.updateProjectEntry(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectEntryCageLowering(req, res, next) {
    projectService.updateProjectEntryCageLowering(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function cageLoweringQtyUpdate(req, res, next) {
    projectService.cageLoweringQtyUpdate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function concretePouringQtyUpdate(req, res, next) {
    projectService.concretePouringQtyUpdate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectEntryConcretePouring(req, res, next) {
    projectService.updateProjectEntryConcretePouring(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectEntryFinal(req, res, next) {
    projectService.updateProjectEntryFinal(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectHistoryFinal(req, res, next) {
    projectService.updateProjectHistoryFinal(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectHistorycageLoweringEndTime(req, res, next) {
    projectService.updateProjectHistorycageLoweringEndTime(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updateProjectHistoryconcretePourEndTime(req, res, next) {
    projectService.updateProjectHistoryconcretePourEndTime(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


function getAllAddedProjectEntry(req, res, next) {
    projectService.getAllAddedProjectEntry()
        .then(projects => res.json(projects))
        .catch(err => next(err));
}


function cageLoweringQtyProjectHistoryUpdate(req, res, next) {
    projectService.cageLoweringQtyProjectHistoryUpdate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function concretePouringQtyProjectHistoryUpdate(req, res, next) {
    projectService.concretePouringQtyProjectHistoryUpdate(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function updateProjectHistoryfoundinglevel(req, res, next) {
    projectService.updateProjectHistoryfoundinglevel(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function totalBoringTime(req, res, next) {
    projectService.totalBoringTime(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getPilingCutOffLevel(req, res, next) {
    projectService.getPilingCutOffLevel(req.params.pileNo)
        .then(project => project ? res.json(project) : res.sendStatus(404))
        .catch(err => next(err));
}