"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = exports.verifyPassword = exports.hashPassword = void 0;
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const scrypt = (0, node_util_1.promisify)(node_crypto_1.scrypt);
const KEY_LENGTH = 64;
const SALT_BYTES = 16;
const JWT_ISSUER = 'share-it-api';
const JWT_AUDIENCE = 'share-it-client';
/**
 * Hashes a password with scrypt and a per-password random salt.
 * Output format: `<salt-hex>:<hash-hex>`.
 */
const hashPassword = async (password) => {
    const salt = (0, node_crypto_1.randomBytes)(SALT_BYTES).toString('hex');
    const derivedKey = await scrypt(password, salt, KEY_LENGTH);
    return `${salt}:${derivedKey.toString('hex')}`;
};
exports.hashPassword = hashPassword;
/** Constant-time comparison of a password against a stored scrypt hash. */
const verifyPassword = async (password, storedHash) => {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) {
        return false;
    }
    const storedKey = Buffer.from(key, 'hex');
    const derivedKey = await scrypt(password, salt, storedKey.length);
    return (storedKey.length === derivedKey.length &&
        (0, node_crypto_1.timingSafeEqual)(storedKey, derivedKey));
};
exports.verifyPassword = verifyPassword;
const generateToken = (userId) => {
    const payload = { id: userId };
    return jsonwebtoken_1.default.sign(payload, (0, env_1.env)().JWT_SECRET, {
        expiresIn: (0, env_1.env)().JWT_EXPIRATION_DURATION,
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
    });
};
exports.generateToken = generateToken;
/**
 * Verifies a JWT and returns its payload.
 * @throws when the token is invalid, expired or malformed
 */
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, (0, env_1.env)().JWT_SECRET, {
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
    });
    if (typeof decoded !== 'object' ||
        typeof decoded.id !== 'number') {
        throw new Error('Invalid token payload');
    }
    return { id: decoded.id };
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=index.js.map