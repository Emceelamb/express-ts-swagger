import { Database } from "sqlite3";
import fs from "fs";

export const createDB = () => {
  const db = new Database(__dirname + "/db.sqlite");
  db.exec(fs.readFileSync(__dirname + "/sql/sample-quotes.sql").toString());
  console.log("Created database.");
};
