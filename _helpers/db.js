const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect("mongodb://rkec:rkec123@ds245347.mlab.com:45347/rkec-consapp-db",
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
    User: require('../users/user.model')
    
    // Product: require('../products/product.model'),
    // Category: require('../categories/category.model'),
    // VisitingCardOrderDetails : require('../orderdetails/visitingCardOrderDetails.model'),
    // ProductInCart : require('../products/productInCart.model'),
    // UserOrderDetails:require('../orderdetails/userOrderDetails.model')
};
