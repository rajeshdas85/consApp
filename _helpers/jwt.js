const expressJwt = require('express-jwt');
const config = require('config.json');
// const userService = require('../users/user.service');
// const productService = require('../products/product.service');
// const categoryService = require('../categories/category.service');
// const visitingCardOrderDetailsService = require('../orderdetails/visitingCardOrderDetails.service');
// const userOrderDetailsService = require('../orderdetails/userOrderDetails.service');
module.exports = jwt;

function jwt() {
    const secret = "123456789aaa";
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register'
            //,
            //Need to Remove While authenticating as i have add temporarily 
            //'/products/addProduct',
            //'/products/',
            //'/products/getProductById',
            //'/upload'
            // '/products',
            // '/categories',
            // '/categories/addCategory',
            // '/categories/getAllCategoryForddl'
            
            
          
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};