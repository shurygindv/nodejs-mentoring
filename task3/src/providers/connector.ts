import {Container} from 'inversify';

import {JwtProvider} from './jwt/jwt-provider';
import {AuthProvider} from './authorization/auth-provider';

import {connectDatabaseProvider} from './database/connect-database';

import {providerTokens} from './tokens';
import {AuthMiddleware} from './authorization/auth-middleware';

const using: Record<string, string> = {
    AuthProvider: providerTokens.auth.authProvider,
    AuthMiddleware: providerTokens.auth.authMiddleware,
    JwtProvider: providerTokens.jwtProvider,
};

const connectAuthProvider = (container: Container): void => {
    container.bind(using.AuthProvider).to(AuthProvider);
    container.bind(using.AuthMiddleware).to(AuthMiddleware);
};

const connectJwtProvider = (container: Container): void => {
    container.bind(using.JwtProvider).to(JwtProvider);
};

export const connectProviders = (container: Container): void =>
    [connectDatabaseProvider, connectAuthProvider, connectJwtProvider].forEach(
        register => register(container),
    );
