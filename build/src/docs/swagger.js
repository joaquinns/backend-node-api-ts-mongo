"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Api app documentation',
        version: '1.0.0'
    },
    servers: [
        {
            url: process.env.API_HOST || 'http://localhost:4000'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: {
            user: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                    passwordConfirmation: {
                        type: 'string'
                    }
                }
            },
            auth: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
