"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var router = express_1.default.Router();
dotenv_1.default.config();
router.get("/login/success", function (req, res) {
    if (req.user) {
        return res.status(200).send({
            success: true,
            message: "User authenticated.",
            user: req.user,
        });
    }
    else {
        return res.status(403);
    }
});
router.post("/login", passport_1.default.authenticate("local"), function (req, res) {
    res.status(200).send(req.user);
});
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
    session: true,
}), function (req, res) {
    res.redirect(process.env.CLIENT_URL || "/");
});
router.delete("/logout", function (req, res, next) {
    var user = req.user;
    req.logout(function (err) {
        if (err) {
            throw err;
        }
        return res.status(200).send(user);
    });
});
module.exports = router;
//# sourceMappingURL=auth.js.map