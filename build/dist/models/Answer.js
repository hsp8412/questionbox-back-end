"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAnswer = exports.Answer = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var answerSchema = new mongoose_1.default.Schema({
    questionId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    },
    value: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.Answer = mongoose_1.default.model("Answer", answerSchema, "answer");
function validateAnswer(answer) {
    var schema = joi_1.default
        .object({
        value: joi_1.default.string().max(500).min(1).required(),
        questionId: joi_1.default.string(),
    })
        .unknown(true);
    return schema.validate(answer);
}
exports.validateAnswer = validateAnswer;
//# sourceMappingURL=Answer.js.map