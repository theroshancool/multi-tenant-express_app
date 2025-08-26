import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json"; // Where the generated spec will be saved
const endpointsFiles = ["./app.js"]; // Paths to your route/controller files

const config = {
  info: {
    title: "My API Documentation",
    description: "API documentation for my Express application",
  },
  host: "localhost:3000", // Your API host
  schemes: ["http"], // Your API schemes
  // Add more OpenAPI specification properties as needed
};

swaggerAutogen(outputFile, endpointsFiles, config);
