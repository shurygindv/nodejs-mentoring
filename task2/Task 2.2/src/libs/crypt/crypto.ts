import * as argon2 from 'argon2';

export default class Crypto {
    public static async hash(value: string): Promise<string> {
        return argon2.hash(value);
    }

    public static async compare(plain: string, hash: string): Promise<boolean> {
        return argon2.verify(hash ,plain);
    }
}
