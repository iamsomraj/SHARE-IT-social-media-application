"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
}
const knex = (0, knex_1.default)({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        directory: '../migrations',
        extension: 'ts',
    },
    seeds: {
        directory: '../seeds',
        extension: 'ts',
    },
});
objection_1.Model.knex(knex);
exports.default = knex;
//# sourceMappingURL=db-config.js.map