import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import { Database } from "sqlite3";
import { createDB } from "./database";

// Open a SQLite database, stored in the file db.sqlite
const db = new Database("./src/database/db.sqlite");

try {
  db.get("SELECT * from quotes", (_, res) => {
    if (!res) {
      createDB();
    } else {
      console.log(res);
    }
  });
} catch (error) {
  console.error(error);
}

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
