import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BALA DA SOGRA - API',
      version: '1.0.0',
      description: 'API para controle de estoque e envio de propostas'
    },
    servers: [{ url: 'http://localhost:3000/api' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        LoginAdmin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@exemplo.com' },
            password: { type: 'string', example: 'senha123' }
          }
        },
        LoginFornecedor: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'fornecedor@empresa.com' },
            password: { type: 'string', example: 'senha123' }
          }
        },
        Produto: {
          type: 'object',
          properties: {
            idProd: { type: 'string' },
            descProd: { type: 'string', example: 'Copo de Açúcar' },
            unidMedProd: { type: 'string', example: 'Unidade' },
            precoProd: { type: 'number', example: 12.5 },
            criadoEm: { type: 'string' }
          }
        },
        Fornecedor: {
          type: 'object',
          properties: {
            idForn: { type: 'string' },
            nome: { type: 'string', example: 'Fornecedor' },
            CNPJ: { type: 'string', example: '01234567000189' },
            contato: { type: 'string', example: '16999999999' },
            email: { type: 'string', example: 'fornecedor@empresa.com' },
            criadoEm: { type: 'string' }
          }
        },
        Proposta: {
          type: 'object',
          properties: {
            idProp: { type: 'string' },
            descProp: { type: 'string', example: 'Proposta de 100 unidades' },
            valorProp: { type: 'number', example: 500.0 },
            criadoEm: { type: 'string' },
            fornecedor: { $ref: '#/components/schemas/Fornecedor' }
          }
        }
      }
    }
  },
  apis: ['./src/modules/**/*.routes.ts']
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;