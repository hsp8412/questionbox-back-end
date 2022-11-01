"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuestion = exports.Question = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var questionSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    boxId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Box", required: true },
    value: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.Question = mongoose_1.default.model("Question", questionSchema, "question");
function validateQuestion(question) {
    var schema = joi_1.default
        .object({
        value: joi_1.default.string().max(500).min(1).required(),
        boxId: joi_1.default.string(),
    })
        .unknown(true);
    return schema.validate(question);
}
exports.validateQuestion = validateQuestion;
//# sourceMappingURL=Question.js.map