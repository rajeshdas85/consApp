const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const ProjectManager = db.ProjectManager;

//https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34

module.exports = {
    getPMByName,
    addProjectManager
  
};

async function addProjectManager(projectManagerParam) {
    const projectManager = new ProjectManager(projectManagerParam);
    await projectManager.save()
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });
}

async function getPMByName() {
    return await ProjectManager.find().sort({ $natural: -1 });
}
