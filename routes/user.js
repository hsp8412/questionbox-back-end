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
var _this = this;
var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var _a = require("../models/User"), validateUser = _a.validateUser, User = _a.User;
router.post("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var error, _a, username, password, email, avatarUrl, userInDb, e_1, salt, passwordHash, user, result, _id, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = validateUser(req.body).error;
                if (error) {
                    return [2 /*return*/, res.status(400).send(error.details[0].message)];
                }
                _a = req.body, username = _a.username, password = _a.password, email = _a.email, avatarUrl = _a.avatarUrl;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User.findOne({ email: req.body.email })];
            case 2:
                userInDb = _b.sent();
                if (userInDb)
                    return [2 /*return*/, res.status(400).send("Email already exists")];
                return [3 /*break*/, 4];
            case 3:
                e_1 = _b.sent();
                console.log(e_1);
                res.status(500).send("Internal Error");
                return [3 /*break*/, 4];
            case 4: return [4 /*yield*/, bcrypt.genSalt()];
            case 5:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, salt)];
            case 6:
                passwordHash = _b.sent();
                user = new User({
                    username: username,
                    password: passwordHash,
                    email: email,
                    avatarUrl: avatarUrl,
                    createDate: new Date(),
                });
                _b.label = 7;
            case 7:
                _b.trys.push([7, 9, , 10]);
                return [4 /*yield*/, user.save()];
            case 8:
                result = _b.sent();
                _id = result._id;
                res.status(200).send({ id: _id });
                return [3 /*break*/, 10];
            case 9:
                e_2 = _b.sent();
                console.log(e_2);
                res.status(500).send("Internal Error");
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=user.js.map