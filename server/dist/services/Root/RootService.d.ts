export declare class RootError extends Error {
    status: number;
    constructor(status: number, message: string);
}
declare class RootService {
    raiseError(status: number, message: string): never;
}
export default RootService;
//# sourceMappingURL=RootService.d.ts.map