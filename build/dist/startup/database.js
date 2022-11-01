var mongoose = require("mongoose");
require("dotenv").config();
module.exports = function () {
    var uri = process.env.DB_CONNECT_STRING;
    mongoose.connect(uri, { useNewUrlParser: true }, function (err) {
        if (err)
            throw err;
        console.log("Successfully connected");
    });
};
//# sourceMappingURL=database.js.map