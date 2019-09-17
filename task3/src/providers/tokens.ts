import {dbTokens} from './sequelize/tokens';

export const providerTokens = {
    db: dbTokens,
    jwtProvider: 'JwtProvider',
    authProvider: 'AuthProvider',
};