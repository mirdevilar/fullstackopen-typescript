"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
console.log(process.env.NODE_ENV);
const PORT = process.env.NODE_ENV === 'production'
    ? 3000
    : 3003;
const baseUrl = '/api/';
const app = (0, express_1.default)();
app.get(baseUrl + 'ping', (_req, res) => {
    console.log('pinged');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server is ready at http://localhost:${PORT}`);
});
