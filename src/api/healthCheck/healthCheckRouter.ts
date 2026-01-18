// Import OpenAPI registry for API documentation generation
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// Import Express framework and types for request/response handling
import express, { type Request, type Response, type Router } from "express";
// Import Zod for schema validation
import { z } from "zod";

// Import utility for creating standardized API responses
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
// Import ServiceResponse model for consistent response formatting
import { ServiceResponse } from "@/common/models/serviceResponse";

// Initialize OpenAPI registry for health check endpoint documentation
export const healthCheckRegistry = new OpenAPIRegistry();
// Create Express router for health check routes
export const healthCheckRouter: Router = express.Router();

// Register health check endpoint in OpenAPI documentation
healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

// Define GET endpoint handler for health check
healthCheckRouter.get("/", (_req: Request, res: Response) => {
  // Create success response with health status message
  const serviceResponse = ServiceResponse.success("Service is healthy", null);
  // Send response with appropriate status code and payload
  res.status(serviceResponse.statusCode).send(serviceResponse);
});
