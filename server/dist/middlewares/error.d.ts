import { Request, Response, NextFunction } from 'express';
export declare const pageNotFound: (req: Request, res: Response, next: NextFunction) => void;
export declare const errorHandler: (err: Error & {
    status?: number;
}, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=error.d.ts.map