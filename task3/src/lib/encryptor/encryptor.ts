import * as argon from 'argon2';

export default class Encryptor {
    public static hash (plain: string): Promise<string> {
        return argon.hash(plain);
    }

    public static verify (hash: string, plain: string): Promise<boolean> {
        return argon.verify(hash, plain);
    }
}
