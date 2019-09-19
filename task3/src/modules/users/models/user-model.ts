export class UserModel {
    public id?: guidV4;
    public login: string;
    public password: string;
    public age: number;

    public constructor (
        id: guidV4,
        login: string,
        password: string,
        age: number
    ) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.age = age;
    }
}
