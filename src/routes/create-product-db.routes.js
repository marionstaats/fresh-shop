const Product = require("../models/product");

module.exports = function(app){
    app.route('/create-product-db')
        .post((req, res) => {            
            const product = new Product({
                productName: req.body.name,
                productPrice: req.body.price,
                productImage: req.body.image
            })
            product.save();
        })
}