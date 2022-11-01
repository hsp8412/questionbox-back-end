"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var Question_1 = require("../models/Question");
var Answer_1 = require("../models/Answer");
var Box_1 = require("../models/Box");
var router = express_1.default.Router();
//Get answer by question id
router.get("/:questionId", auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var questionId, question, answer;
    return __generator(this, function (_a) {
        questionId = req.params.questionId;
        try {
            question = Question_1.Question.findOne({ _id: questionId });
        }
        catch (err) {
            return [2 /*return*/, res.send(500).send(err.message)];
        }
        if (!question) {
            return [2 /*return*/, res.send(400).send("Invalid question id")];
        }
        try {
            answer = Answer_1.Answer.findOne({ questionId: questionId });
        }
        catch (err) {
            return [2 /*return*/, res.send(500).send(err.message)];
        }
        return [2 /*return*/, res.status(200).send(answer)];
    });
}); });
//Post new answer
router.post("/", auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error, _a, value, questionId, question, e_1, boxId, box, e_2, newAnswer, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.user._id;
                error = (0, Answer_1.validateAnswer)(req.body).error;
                if (error)
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                _a = req.body, value = _a.value, questionId = _a.questionId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Question_1.Question.findOne({ _id: questionId })];
            case 2:
                question = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                return [2 /*return*/, res.status(500).send(e_1.message)];
            case 4:
                if (!question) {
                    return [2 /*return*/, res.status(400).send("Invalid question id.")];
                }
                boxId = question.boxId;
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Box_1.Box.findOne({ _id: boxId, userId: userId })];
            case 6:
                box = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                e_2 = _b.sent();
                return [2 /*return*/, res.status(500).send(e_2.message)];
            case 8:
                if (!box) {
                    return [2 /*return*/, res
                            .status(400)
                            .send("You can only write answers to questions in your own boxes.")];
                }
                newAnswer = new Answer_1.Answer({ value: value, questionId: questionId });
                _b.label = 9;
            case 9:
                _b.trys.push([9, 11, , 12]);
                return [4 /*yield*/, newAnswer.save()];
            case 10:
                _b.sent();
                return [2 /*return*/, res.status(200).send(newAnswer)];
            case 11:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).send(err_1.message)];
            case 12: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=answer.js.map