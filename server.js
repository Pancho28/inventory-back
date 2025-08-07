import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import routesLocals from './routes/locals.js';
import routesProducts from './routes/products.js';
import dbConnection from "./config/dbConnection.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/locals", routesLocals);
app.use("/products", routesProducts);

try {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Error reading environment variables:", error);
}

process.on("SIGINT", async () => {
  try {
    dbConnection.closeDb();
    console.log("Server shutting down gracefully");
    process.exit(0);
  } catch (error) {
    console.error("Error during server shutdown:", error);
    process.exit(1);
  }
});