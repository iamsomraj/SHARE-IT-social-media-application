import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';
export declare const ZodAuthSchema: z.ZodObject<{
    uuid: z.ZodString;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
    token: string;
}, {
    uuid: string;
    token: string;
}>;
export declare const ZodLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const ZodRegisterSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    name: string;
    email: string;
}, {
    password: string;
    name: string;
    email: string;
}>;
export declare const ZodFollowSchema: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
}, {
    uuid: string;
}>;
export declare const ZodSearchPersonSchema: z.ZodObject<{
    query: z.ZodString;
}, "strip", z.ZodTypeAny, {
    query: string;
}, {
    query: string;
}>;
export declare const ZodUserDataSchema: z.ZodObject<{
    id: z.ZodNumber;
    uuid: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    uuid: string;
    id: number;
}, {
    name: string;
    email: string;
    uuid: string;
    id: number;
}>;
export declare const ZodCreatePostSchema: z.ZodObject<{
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export declare const ZodPostActionSchema: z.ZodObject<{
    postUUID: z.ZodString;
}, "strip", z.ZodTypeAny, {
    postUUID: string;
}, {
    postUUID: string;
}>;
export declare const ZodFetchPostSchema: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
}, {
    uuid: string;
}>;
export declare const ZodUuidSchema: z.ZodString;
export declare const ZodPaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const ZodUuidParamsSchema: z.ZodObject<{
    uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uuid: string;
}, {
    uuid: string;
}>;
export declare const ZodPostUuidParamsSchema: z.ZodObject<{
    post_uuid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    post_uuid: string;
}, {
    post_uuid: string;
}>;
export declare const ZodPaginationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
}, {
    limit?: number | undefined;
    page?: number | undefined;
}>;
export declare const ZodSearchQuerySchema: z.ZodObject<{
    searchQuery: z.ZodString;
}, "strip", z.ZodTypeAny, {
    searchQuery: string;
}, {
    searchQuery: string;
}>;
export type AuthInput = z.infer<typeof ZodAuthSchema>;
export type LoginInput = z.infer<typeof ZodLoginSchema>;
export type RegisterInput = z.infer<typeof ZodRegisterSchema>;
export type FollowInput = z.infer<typeof ZodFollowSchema>;
export type SearchPersonInput = z.infer<typeof ZodSearchPersonSchema>;
export type CreatePostInput = z.infer<typeof ZodCreatePostSchema>;
export type PostActionInput = z.infer<typeof ZodPostActionSchema>;
export type PaginationInput = z.infer<typeof ZodPaginationSchema>;
export type UuidParamsInput = z.infer<typeof ZodUuidParamsSchema>;
export type PostUuidParamsInput = z.infer<typeof ZodPostUuidParamsSchema>;
export type PaginationQueryInput = z.infer<typeof ZodPaginationQuerySchema>;
export type SearchQueryInput = z.infer<typeof ZodSearchQuerySchema>;
export type UserDataInput = z.infer<typeof ZodUserDataSchema>;
export declare const validateZodRequest: <T>(schema: z.ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateZodQuery: <T>(schema: z.ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateZodParams: <T>(schema: z.ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => void;
export declare const validateWithZod: <T>(schema: z.ZodSchema<T>, data: unknown) => T;
export declare const safeValidateWithZod: <T>(schema: z.ZodSchema<T>, data: unknown) => {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
};
//# sourceMappingURL=index.d.ts.map