"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTimestamp = exports.formatDate = exports.isValidUUID = exports.isValidEmail = exports.sanitizeString = exports.generateSecureRandom = exports.generateUUID = exports.verifyToken = exports.generateToken = exports.validateHash = exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CRYPTO_CONFIG = {
    RADIX: 'hex',
    ALGORITHM: 'sha512',
    ITERATIONS: 1000,
    KEY_LENGTH: 64,
};
if (!process.env.SALT) {
    throw new Error('SALT environment variable is required');
}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
}
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;
const hash = (password) => {
    return crypto_1.default
        .pbkdf2Sync(password, SALT, CRYPTO_CONFIG.ITERATIONS, CRYPTO_CONFIG.KEY_LENGTH, CRYPTO_CONFIG.ALGORITHM)
        .toString(CRYPTO_CONFIG.RADIX);
};
exports.hash = hash;
const validateHash = (password, hashedPassword) => {
    const currentHash = crypto_1.default
        .pbkdf2Sync(password, SALT, CRYPTO_CONFIG.ITERATIONS, CRYPTO_CONFIG.KEY_LENGTH, CRYPTO_CONFIG.ALGORITHM)
        .toString(CRYPTO_CONFIG.RADIX);
    return currentHash === hashedPassword;
};
exports.validateHash = validateHash;
const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d',
        issuer: 'share-it-api',
        audience: 'share-it-client',
    });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.id || typeof decoded.id !== 'number') {
            throw new Error('Invalid token payload');
        }
        return decoded;
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token expired');
        }
        throw new Error('Token verification failed');
    }
};
exports.verifyToken = verifyToken;
const generateUUID = () => {
    return crypto_1.default.randomUUID();
};
exports.generateUUID = generateUUID;
const generateSecureRandom = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateSecureRandom = generateSecureRandom;
const sanitizeString = (input) => {
    return input.trim().replace(/[<>]/g, '');
};
exports.sanitizeString = sanitizeString;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};
exports.isValidUUID = isValidUUID;
const formatDate = (date = new Date()) => {
    return date.toISOString();
};
exports.formatDate = formatDate;
const getCurrentTimestamp = () => {
    return new Date().toISOString();
};
exports.getCurrentTimestamp = getCurrentTimestamp;
//# sourceMappingURL=index.js.map