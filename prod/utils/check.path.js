"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPath = void 0;
const fs_1 = require("fs");
function checkPath(path) {
    if (!(0, fs_1.existsSync)(path)) {
        (0, fs_1.mkdirSync)(path, { recursive: true });
    }
}
exports.checkPath = checkPath;
