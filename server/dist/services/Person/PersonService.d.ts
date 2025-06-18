import PersonsModel from '@/models/PersonsModel';
import RootService from '@/services/Root/RootService';
import { Person, AuthResponse } from '@/types';
declare class PersonService extends RootService {
    constructor();
    private validateLoginInput;
    private validateRegisterInput;
    loginPerson(email: string, password: string): Promise<AuthResponse>;
    registerPerson(name: string, email: string, password: string): Promise<AuthResponse>;
    getPeople(user: Person, page?: number, limit?: number): Promise<PersonsModel[]>;
    getUserData(user: Person): Promise<PersonsModel>;
    getPersonProfile(uuid: string): Promise<PersonsModel>;
    followPerson(user: Person, uuid: string): Promise<PersonsModel>;
    unfollowPerson(user: Person, uuid: string): Promise<PersonsModel>;
    search(user: Person, searchQuery: string): Promise<PersonsModel[]>;
    private updatePersonStats;
}
export default PersonService;
//# sourceMappingURL=PersonService.d.ts.map