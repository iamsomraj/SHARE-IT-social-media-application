import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types';
export declare const authenticateToken: (req: CustomRequest, res: Response, next: NextFunction) => void;
export declare const optionalAuth: (req: CustomRequest, _res: Response, next: NextFunction) => void;
export declare const rateLimit: (maxRequests?: number, windowMs?: number) => (req: CustomRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map