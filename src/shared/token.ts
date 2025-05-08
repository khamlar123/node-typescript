const jwt = require('jsonwebtoken');


// Define your JWT payload interface
interface JwtPayload {
    userId: number;
    email: string;
    // Add other properties your token might contain
    [key: string]: any;
}

// Define return type for verifyToken
interface VerifiedToken extends JwtPayload {
    iat?: number; // issued at
    exp?: number; // expiration time
}

export function verifyToken(token: string): VerifiedToken {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    try {
        const value = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }) as VerifiedToken;
        return value;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

export function  signToken(payload: any, option: 'token' | 'refreshToken'): string {
    // if (!process.env.JWT_SECRET) {
    //     throw new Error('JWT_SECRET is not defined in environment variables');
    // }
    try {
        const value = jwt.sign(payload, 'superman', {
            algorithm: 'HS256',
            expiresIn: option === 'token' ? process.env.JWT_EXPIRES_IN : process.env.JWT_REFRESH_EXPIRES_IN  // Default to 1 hour if not specified
        });
        return value;
    } catch (error) {
        throw new Error('Failed to sign token');
    }
}