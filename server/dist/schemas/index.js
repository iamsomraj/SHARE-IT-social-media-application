"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.PaginationQuerySchema = exports.PostUuidParamsSchema = exports.UuidParamsSchema = exports.SearchSchema = exports.CreatePostSchema = exports.RegisterSchema = exports.LoginSchema = exports.AuthSchema = void 0;
const zod_1 = require("zod");
const http_codes_1 = require("../utils/constants/http-codes");
const messages_1 = require("../utils/constants/messages");
// =========================
// REQUEST SCHEMAS
// =========================
exports.AuthSchema = zod_1.z.object({
    uuid: zod_1.z.uuid('Invalid UUID format'),
    token: zod_1.z.string().min(1, 'Token is required'),
});
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email('Please provide a valid email address').toLowerCase(),
    password: zod_1.z.string().min(4, 'Password must be at least 4 characters long'),
});
exports.RegisterSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(4, 'Name must be at least 4 characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    email: zod_1.z.email('Please provide a valid email address').toLowerCase(),
    password: zod_1.z
        .string()
        .min(4, 'Password must be at least 4 characters long')
        .max(128, 'Password cannot exceed 128 characters'),
});
exports.CreatePostSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .trim()
        .min(1, 'Post content cannot be empty')
        .max(500, 'Post content cannot exceed 500 characters'),
});
exports.SearchSchema = zod_1.z.object({
    searchQuery: zod_1.z
        .string()
        .trim()
        .min(1, 'Search query cannot be empty')
        .max(100, 'Search query cannot exceed 100 characters'),
});
exports.UuidParamsSchema = zod_1.z.object({
    uuid: zod_1.z.uuid('Invalid UUID format'),
});
exports.PostUuidParamsSchema = zod_1.z.object({
    post_uuid: zod_1.z.uuid('Invalid post UUID format'),
});
exports.PaginationQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
});
const formatIssues = (error) => error.issues
    .map(issue => issue.path.length
    ? `${issue.path.join('.')}: ${issue.message}`
    : issue.message)
    .join(', ');
/**
 * Validates one part of the request against a Zod schema and replaces it
 * with the parsed (coerced, trimmed, defaulted) value.
 */
const validate = (part, schema) => (req, res, next) => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
        const response = {
            state: false,
            message: formatIssues(result.error) || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
        };
        res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
        return;
    }
    // `req.query` is a getter in Express 5, so it has to be redefined.
    Object.defineProperty(req, part, {
        value: result.data,
        writable: true,
        enumerable: true,
        configurable: true,
    });
    next();
};
exports.validate = validate;
//# sourceMappingURL=index.js.map