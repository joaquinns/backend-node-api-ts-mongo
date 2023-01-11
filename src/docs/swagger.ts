import 'dotenv/config'
import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc'

const swaggerDefinition: OAS3Definition = {
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
          }
        }
      }
    }
  }
}

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts']
}

export default swaggerJSDoc(swaggerOptions)
