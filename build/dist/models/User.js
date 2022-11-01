"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUp = exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        default: "",
    },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Boolean, default: false },
    verify_token: { type: String, default: null },
    provider: { type: String, default: "email" },
    provider_id: { type: String, default: null },
    password: { type: String, required: true },
    password_reset_token: { type: String, default: null },
    image: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.User = mongoose_1.default.model("User", userSchema, "user");
function validateSignUp(user) {
    var schema = joi_1.default
        .object({
        username: joi_1.default.string().max(50).min(1).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        image: joi_1.default.string(),
    })
        .unknown(true);
    return schema.validate(user);
}
exports.validateSignUp = validateSignUp;
//# sourceMappingURL=User.js.map