/* Import packages */
import dotenv from "dotenv";
import express, { Express } from "express";
import kill from "kill-port";

dotenv.config();

// Kill process if port is in use
try {
  kill(3001, "tcp");
} catch (error) {
  /* Empty */
}

// Clear console
console.clear();

// Initialize dotenv
dotenv.config();

// Initialize express
let api: Express = express();

// Initialize Routes
require("./util/Middleware").default(api);
api.use("/", require("./util/RoutesManager").default(api));

// Initialize swaggerUI
require("./util/Swagger").default(api);