import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "API Backend",
      description: "Documentación de Users",
      version: "1.0.0"
    }
  },
  apis: ["./src/docs/*.yaml"]
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);