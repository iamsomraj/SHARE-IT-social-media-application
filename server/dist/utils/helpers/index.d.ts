export declare const hash: (password: string) => string;
export declare const validateHash: (password: string, hashedPassword: string) => boolean;
export declare const generateToken: (userId: number) => string;
interface TokenPayload {
    id: number;
    iat?: number;
    exp?: number;
    iss?: string;
    aud?: string;
}
export declare const verifyToken: (token: string) => TokenPayload;
export declare const generateUUID: () => string;
export declare const generateSecureRandom: (length?: number) => string;
export declare const sanitizeString: (input: string) => string;
export declare const isValidEmail: (email: string) => boolean;
export declare const isValidUUID: (uuid: string) => boolean;
export declare const formatDate: (date?: Date) => string;
export declare const getCurrentTimestamp: () => string;
export {};
//# sourceMappingURL=index.d.ts.map