const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect("mongodb://rkec:rkec123@ds245347.mlab.com:45347/rkec-consapp-db",
{ 
    useCreateIndex: true,
    useNewUrlParser: true 
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Product: require('../products/product.model'),
    Category: require('../categories/category.model'),
    VisitingCardOrderDetails : require('../orderdetails/visitingCardOrderDetails.model'),
    ProductInCart : require('../products/productInCart.model'),
    UserOrderDetails:require('../orderdetails/userOrderDetails.model')
};
