"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateWithZod = exports.validateWithZod = exports.validateZodParams = exports.validateZodQuery = exports.validateZodRequest = exports.ZodSearchQuerySchema = exports.ZodPaginationQuerySchema = exports.ZodPostUuidParamsSchema = exports.ZodUuidParamsSchema = exports.ZodPaginationSchema = exports.ZodUuidSchema = exports.ZodFetchPostSchema = exports.ZodPostActionSchema = exports.ZodCreatePostSchema = exports.ZodUserDataSchema = exports.ZodSearchPersonSchema = exports.ZodFollowSchema = exports.ZodRegisterSchema = exports.ZodLoginSchema = exports.ZodAuthSchema = void 0;
const zod_1 = require("zod");
const http_codes_1 = require("@/utils/constants/http-codes");
const messages_1 = require("@/utils/constants/messages");
exports.ZodAuthSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid('Invalid UUID format'),
    token: zod_1.z.string().min(1, 'Token is required'),
});
exports.ZodLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Please provide a valid email address'),
    password: zod_1.z.string().min(4, 'Password must be at least 4 characters long'),
});
exports.ZodRegisterSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(4, 'Name must be at least 4 characters long')
        .max(50, 'Name cannot exceed 50 characters'),
    email: zod_1.z.string().email('Please provide a valid email address'),
    password: zod_1.z.string().min(4, 'Password must be at least 4 characters long'),
});
exports.ZodFollowSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid('Invalid person UUID format'),
});
exports.ZodSearchPersonSchema = zod_1.z.object({
    query: zod_1.z
        .string()
        .min(1, 'Search query cannot be empty')
        .max(100, 'Search query cannot exceed 100 characters'),
});
exports.ZodUserDataSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    uuid: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
});
exports.ZodCreatePostSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(1, 'Post content cannot be empty')
        .max(500, 'Post content cannot exceed 500 characters'),
});
exports.ZodPostActionSchema = zod_1.z.object({
    postUUID: zod_1.z.string().uuid('Invalid post UUID format'),
});
exports.ZodFetchPostSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid('Invalid post UUID format'),
});
exports.ZodUuidSchema = zod_1.z.string().uuid('Invalid UUID format');
exports.ZodPaginationSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
});
exports.ZodUuidParamsSchema = zod_1.z.object({
    uuid: zod_1.z.string().uuid('Invalid UUID format'),
});
exports.ZodPostUuidParamsSchema = zod_1.z.object({
    post_uuid: zod_1.z.string().uuid('Invalid post UUID format'),
});
exports.ZodPaginationQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).optional().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).optional().default(10),
});
exports.ZodSearchQuerySchema = zod_1.z.object({
    searchQuery: zod_1.z
        .string()
        .min(1, 'Search query cannot be empty')
        .max(100, 'Search query cannot exceed 100 characters'),
});
const validateZodRequest = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.body);
            if (!result.success) {
                const errorMessage = result.error.errors
                    .map(err => `${err.path.join('.')}: ${err.message}`)
                    .join(', ');
                const response = {
                    state: false,
                    message: errorMessage || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
                };
                res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
                return;
            }
            req.body = result.data;
            next();
        }
        catch (error) {
            const response = {
                state: false,
                message: messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
        }
    };
};
exports.validateZodRequest = validateZodRequest;
const validateZodQuery = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.query);
            if (!result.success) {
                const errorMessage = result.error.errors
                    .map(err => `${err.path.join('.')}: ${err.message}`)
                    .join(', ');
                const response = {
                    state: false,
                    message: errorMessage || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
                };
                res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
                return;
            }
            req.query = result.data;
            next();
        }
        catch (error) {
            const response = {
                state: false,
                message: messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
        }
    };
};
exports.validateZodQuery = validateZodQuery;
const validateZodParams = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req.params);
            if (!result.success) {
                const errorMessage = result.error.errors
                    .map(err => `${err.path.join('.')}: ${err.message}`)
                    .join(', ');
                const response = {
                    state: false,
                    message: errorMessage || messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
                };
                res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
                return;
            }
            req.params = result.data;
            next();
        }
        catch (error) {
            const response = {
                state: false,
                message: messages_1.GENERAL_MESSAGES.INVALID_REQUEST,
            };
            res.status(http_codes_1.HTTP_CODES.BAD_REQUEST).json(response);
        }
    };
};
exports.validateZodParams = validateZodParams;
const validateWithZod = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        throw new Error(result.error.errors[0]?.message || 'Validation failed');
    }
    return result.data;
};
exports.validateWithZod = validateWithZod;
const safeValidateWithZod = (schema, data) => {
    const result = schema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            error: result.error.errors[0]?.message || 'Validation failed',
        };
    }
    return { success: true, data: result.data };
};
exports.safeValidateWithZod = safeValidateWithZod;
//# sourceMappingURL=index.js.map