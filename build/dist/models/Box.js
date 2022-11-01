"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBox = exports.Box = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var joi_1 = __importDefault(require("joi"));
var boxSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    boxName: { type: String, required: true },
    visible: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.Box = mongoose_1.default.model("Box", boxSchema, "box");
function validateBox(box) {
    var schema = joi_1.default
        .object({
        boxName: joi_1.default.string().max(100).min(1).required(),
    })
        .unknown(true);
    return schema.validate(box);
}
exports.validateBox = validateBox;
//# sourceMappingURL=Box.js.map