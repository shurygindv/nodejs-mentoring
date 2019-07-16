import * as bcrypt from 'bcrypt';

export default class Crypto {
    public static async hash(value: string): Promise<string> {
        return new Promise((resolver, rejecter) => {
            bcrypt.genSalt(10, (err: Error, salt) => {
                bcrypt.hash(value, salt, (err, hash) => {
                    if (err) {
                        rejecter(err);
                    }

                    resolver(hash);
                });
            });
        });
    }

    public static async compare(plain: string, hash: string): Promise<boolean> {
        return new Promise((resolver, rejector) => {
            bcrypt.compare(plain, hash, (err: Error, res) => {
                if (err) {
                    return rejector(err);
                }

                resolver(res);
            });
        });
    }
}
