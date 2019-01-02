const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Project = db.Project;
const ProjectHistory = db.ProjectHistory;
const ProjectEntry = db.ProjectEntry;
const ProjectRecording = db.ProjectRecording;
//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34

module.exports = {
    addProject,
    addProjectHistory,
    addProjectEntry,
    updateProjectEntry,
    addProjectRecording,
    updateProject,
    updateProjectHistory,
    updateProjectRecording,
    getProjectDtlById,
    getLastAddProduct,
    getLastAddedProjectEntry,
    getProjectRecordingDtlByPilno,
    getAllProjectHistory,
    getAllProjectEntryInProgress
};

async function getProjectDtlById(id) {
    return await Project.find({ "id": id }).sort({ $natural: -1 }).limit(1);
}

async function getLastAddProduct() {
    return await Project.find().sort({ $natural: -1 });
}
// Started  ProjectEntry

//Last Enter record in Project Entry
async function getLastAddedProjectEntry() {
    return await ProjectEntry.find().sort({ $natural: -1 }).limit(1);
}
// 1- inProgress Boaring,2-Completed Boaring
//3-Cage InProgress,4-Cage Completed
//5-ConcretePouring In Progress
//6-ConcretePouring Completed
async function getAllProjectEntryInProgress() {
    return await ProjectEntry.find({ "statusOfPilling": { $ne: 6 } }).sort({ $natural: -1 });
}
//Project Entry
async function addProjectEntry(projectParam) {
    const projectEntry = new ProjectEntry(projectParam);
    await projectEntry.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
async function updateProjectEntry(param) {
    return await projectEntry.update({ pileNo: param.pileNo },
        {
            $set:
            {
                cageloweringStartTime: param.cageloweringStartTime,
                cageloweringEndTime: param.cageloweringEndTime,
            }

        }, { multi: true, new: true });
}
// Ended  ProjectEntry

//Recoding started
async function addProjectRecording(projectParam) {
    const projectRecording = new ProjectRecording(projectParam);
    await projectRecording.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}


async function getProjectRecordingDtlByPilno(pileNo) {
    return await ProjectRecording.find({ "pileNo": pileNo }).sort({ $natural: -1 }).limit(1);
}


//Recoding Ended
async function getAllProjectHistory(uniqueId) {
    console.log("enter");
    return await ProjectHistory.find({ "uniqueId": uniqueId }).sort({ $natural: -1 });
}
async function addProject(projectParam) {
    console.log(projectParam);
    const project = new Project(projectParam);
    await project.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
async function addProjectHistory(projectParam) {

     // validate
    if (await ProjectHistory.findOne({ pileNo: projectParam.pileNo+'-'+projectParam.uniqueId })) {
        throw 'pile No  "' + projectParam.pileNo.split('-')[0] + '" is already taken';
    }
    const projectHistory = new ProjectHistory(projectParam);
    await projectHistory.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
             throw 'pile No  "' + projectParam.pileNo.split('-')[0] + '" is already taken';
        });
}



// async function addProjectRecording(projectParam) {
//     const projectRecording = new ProjectRecording(projectParam);
//     await projectRecording.save()
//         .then((data) => {
//             console.log(data);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// }

async function updateProject(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                pillingInfoByProjectID1: param.pillingInfoByProjectID1,
                pillingInfoByProjectID2: param.pillingInfoByProjectID2,
                otherInfoByProjectID: param.otherInfoByProjectID,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}

async function updatePillingDataWithUniqueID(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id},
        {
            $set:
            {
                pillingInfoByProjectID1: param.pillingInfoByProjectID1,
                pillingInfoByProjectID2: param.pillingInfoByProjectID2,
                otherInfoByProjectID: param.otherInfoByProjectID,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}
async function updateProjectHistory(param) {
    return await ProjectHistory.update({ pileNo: param.pileNo },
        {
            $set:
            {
                pillingRigDetails: param.pillingRigDetails
            }

        }, { multi: true, new: true });
}
async function updateProjectRecording(param) {
    return await projectRecording.update({ PileNo: param.PileNo },
        {
            $set:
            {
                pillingRigDetails: param.pillingRigDetails,
                updateDate: Date.now()
            }

        }, { multi: true, new: true });
}