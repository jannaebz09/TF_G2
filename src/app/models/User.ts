import { Role } from "./Role";

export class User {
    idUser: number = 0;
    userName: string = '';
    fullName: string = '';
    email: string = '';
    password: string = '';
    enabled: boolean = false;
    symptoms: string = '';
    dni: number = 0;
    roles: Role[] = [];
}