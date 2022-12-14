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
var dotenv_1 = __importDefault(require("dotenv"));
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var User = require("../models/User").User;
var bcrypt = require("bcryptjs");
dotenv_1.default.config();
module.exports = function (passport) {
    var _this = this;
    passport.use(new LocalStrategy({ usernameField: "email" }, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
        var user, validLogin, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("in");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, User.findOne({
                            email: email,
                            provider: "email",
                        })];
                case 2:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, done(null, false)];
                    }
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 3:
                    validLogin = _a.sent();
                    if (!validLogin) {
                        return [2 /*return*/, done(null, false)];
                    }
                    return [2 /*return*/, done(null, user)];
                case 4:
                    err_1 = _a.sent();
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    }); }));
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
    }, function (accessToken, refreshToken, profile, done) {
        return __awaiter(this, void 0, void 0, function () {
            var user, e_1, emails, randomString, salt, passwordHash, newUser, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findOne({
                                provider_id: profile.id,
                                provider: "google",
                            })];
                    case 1:
                        user = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, done(e_1, null)];
                    case 3:
                        console.log(user);
                        if (user) {
                            return [2 /*return*/, done(null, user)];
                        }
                        emails = profile.emails;
                        if (!emails) {
                            return [2 /*return*/, done(new Error("No valid email."), null)];
                        }
                        randomString = Math.random().toString(36).substring(2);
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 4:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(randomString, salt)];
                    case 5:
                        passwordHash = _a.sent();
                        newUser = new User({
                            username: profile.displayName,
                            email: emails[0].value,
                            email_verified: true,
                            password: passwordHash,
                            image: profile._json.picture,
                            provider: "google",
                            provider_id: profile.id,
                        });
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, newUser.save()];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        e_2 = _a.sent();
                        return [2 /*return*/, done(e_2, null)];
                    case 9: return [2 /*return*/, done(null, newUser)];
                }
            });
        });
    }));
    passport.serializeUser(function (user, cb) {
        cb(null, user._id.toString());
    });
    passport.deserializeUser(function (id, cb) { return __awaiter(_this, void 0, void 0, function () {
        var user, e_3, userInformation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User.findOne({ _id: id })];
                case 1:
                    user = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    cb(e_3, null);
                    return [3 /*break*/, 3];
                case 3:
                    userInformation = {
                        username: user.username,
                        email: user.email,
                        _id: user._id,
                        image: user.image,
                    };
                    cb(null, userInformation);
                    return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=passport.js.map