"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var joi = require("joi");
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatarUrl: {
        type: String,
        required: false,
    },
    createDate: {
        type: Date,
        require: true,
    },
});
var User = mongoose.model("User", userSchema, "user");
function validateUser(user) {
    var schema = joi.object({
        username: joi.string().max(50).min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        avatarUrl: joi.string(),
    });
    return schema.validate(user);
}
module.exports.User = User;
module.exports.validateUser = validateUser;
//# sourceMappingURL=User.js.map