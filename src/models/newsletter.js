const mongoose = require("mongoose");

const NewsletterSchema = mongoose.Schema({
        email: String,
        date: {
            type: Date,
            default: Date.now
        }    
});

module.exports = mongoose.model("Newsletter", NewsletterSchema);

