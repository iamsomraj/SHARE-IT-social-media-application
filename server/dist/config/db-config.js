"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const env_1 = require("./env");
/**
 * Small pool: on Vercel each function instance holds its own pool,
 * and the Neon pooler (PgBouncer) multiplexes connections upstream.
 */
const knex = (0, knex_1.default)({
    client: 'pg',
    connection: (0, env_1.env)().DATABASE_URL,
    pool: { min: 0, max: 5 },
});
objection_1.Model.knex(knex);
exports.default = knex;
//# sourceMappingURL=db-config.js.map