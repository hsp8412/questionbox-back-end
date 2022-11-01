"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
function auth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    console.log("failed");
    return res.status(400);
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map