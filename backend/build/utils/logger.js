"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error = (err) => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }
};
exports.default = {
    error
};
