const config = require('config.json');
const database = require('../config/database'); 			// load the database config
const mongoose = require('mongoose');
mongoose.connect(database.awsAdminUrl,
{ 
    useCreateIndex: true,
    useNewUrlParser: true 
});
mongoose.Promise = global.Promise;

module.exports = {
    Project: require('../projects/project.model'),
    ProjectHistory: require('../projects/projectHistory.model'),
    ProjectEntry: require('../projects/projectEntry.model'),
    ProjectRecording: require('../projects/projectRecording.model'),//,
    ProjectManager: require('../projectmanager/projectManager.model'),//,
    ProjectBOM: require('../projects/ProjectBOM.model'),//,
    User: require('../users/user.model'),
    Test: require('../projects/test.model'),
    ProjectUserMapping: require('../projects/projectusermapping.model')
    
    // Product: require('../products/product.model'),
    // Category: require('../categories/category.model'),
    // VisitingCardOrderDetails : require('../orderdetails/visitingCardOrderDetails.model'),
    // ProductInCart : require('../products/productInCart.model'),
    // UserOrderDetails:require('../orderdetails/userOrderDetails.model')
};
