import { Request } from 'express';
import RootService from '../Root/RootService';
import { TokenPayload } from '../../types';
import PersonsModel from '../../models/PersonsModel';
declare class AuthService extends RootService {
    constructor();
    verifyTokenAndReturnDecoded(req: Request): TokenPayload;
    getUserFromToken(req: Request): Promise<PersonsModel>;
    authorize(uuid: string, token: string): Promise<void>;
}
export default AuthService;
//# sourceMappingURL=AuthService.d.ts.map