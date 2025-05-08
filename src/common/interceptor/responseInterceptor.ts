// src/common/interceptor/responseInterceptor.ts
import { Request, Response, NextFunction } from 'express';

const responseInterceptor = (req: Request, res: Response, next: NextFunction) => {
    // Store the original json method
    const originalJson = res.json;

    // Override the json method
    (res as  any).json = function(body?: any) {
        // Standardize successful responses (status code 2xx)
        if (res.statusCode >= 200 && res.statusCode < 300) {
            body = {
                status: res.statusCode,
                data: body || {},
                message: 'Success'
            };
        }
        // Standardize error responses
        else {
            body = {
                status: res.statusCode,
                data: null,
                message: body?.message || 'An error occurred'
            };
        }

        // Call the original json method with the transformed body
        originalJson.call(this, body);
    };

    next();
};

export default responseInterceptor;