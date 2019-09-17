import {Container} from 'inversify';

import {JwtProvider} from './jwt/jwt-provider';
import {AuthProvider} from './authorization/auth-provider';

import {connectDatabaseProvider} from './sequelize/connect-database';

import {providerTokens} from './tokens';

const connectAuthProvider = (container: Container): void => {
    container.bind(providerTokens.authProvider).to(AuthProvider);
}

const connectJwtProvider = (container: Container): void => {
    container.bind(providerTokens.jwtProvider).to(JwtProvider);
}

export const connectProviders = (container: Container): void => [
    connectDatabaseProvider,
    connectAuthProvider,
    connectJwtProvider
].forEach(register => register(container));