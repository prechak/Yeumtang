import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Yeumtang API",
    description: "API documentation",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.mjs"];

swaggerAutogen()(outputFile, endpointsFiles);
