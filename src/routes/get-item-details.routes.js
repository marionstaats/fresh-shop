const Product = require("../models/product");

module.exports = function(app){
    app.route("/get-item-details")
        .post((req, res) => {     
            Product.findOne({productName: req.body.itemName}, (err, product) => {
                res.send({ //adding 'return' because otherwise 2x 'res.send' not working for 1 get
                    price: product.productPrice,
                    image: product.productImage
                })
            })
        })

}
