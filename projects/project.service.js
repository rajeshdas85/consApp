const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const project = db.Project;
const projectHistory = db.ProjectHistory;
const projectEntry = db.ProjectEntry;
//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34

module.exports = {
    addProject,
    addProjectHistory,
    addProjectEntry,
    updateProject,
    updateProjectHistory
};
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
async function updateProject(param) {
    return await project.update({ _id: param.id }, 
            { 
                $set: 
                { 
                 PillingInfoByProjectID: param.PillingInfoByProjectID,
                 OtherInfoByProjectID:param.OtherInfoByProjectID,
                 updateDate : Date.now
                }
            
            }, { multi:true,new: true });
}
async function updateProjectHistory(param) {
    return await projectHistory.update({ PileNo: param.PileNo }, 
            { 
                $set: 
                { 
                 pillingRigDetails: param.pillingRigDetails,
                 updateDate : Date.now
                }
            
            }, { multi:true,new: true });
}
