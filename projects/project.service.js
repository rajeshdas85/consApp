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
    addProjectRecording,
    updateProject,
    updateProjectHistory,
    updateProjectRecording,
    getProjectDtlById,
    getLastAddProduct,
    getLastAddProjectEntry,
    getProjectRecordingDtlByPilno
};

async function getProjectDtlById(id) {
    return await Project.find({ "id": id }).sort({ $natural: -1 }).limit(1);
}

async function getProjectRecordingDtlByPilno(pileNo) {
    return await ProjectRecording.find({ "pileNo": pileNo }).sort({ $natural: -1 }).limit(1);
}
async function getLastAddProduct() {
    return await Project.find().sort({ $natural: -1 }).limit(1);
}
async function getLastAddProjectEntry() {
    return await ProjectEntry.find().sort({ $natural: -1 }).limit(1);
}
async function addProject(projectParam) {
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
    const projectHistory = new ProjectHistory(projectParam);
    await projectHistory.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}
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

async function updateProject(param) {
    //console.log(param.updateDate);
    // var nested = JSON.stringify(param.PillingInfoByProjectID);
    //console.log(nested);
    return await Project.findOneAndUpdate({ _id: param.id },
        {
            $set:
            {
                pillingInfoByProjectID: param.pillingInfoByProjectID,
                otherInfoByProjectID: param.otherInfoByProjectID,
                updateDate: param.updateDate
            }

        }, { multi: true, new: true });
}
async function updateProjectHistory(param) {
    return await projectHistory.update({ PileNo: param.PileNo },
        {
            $set:
            {
                pillingRigDetails: param.pillingRigDetails,
                updateDate: Date.now()
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