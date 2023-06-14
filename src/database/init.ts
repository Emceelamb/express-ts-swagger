import { Database } from "sqlite3";

const validateDB = (db: Database) => {
  const rows = db.all("SELECT * from quotes");
  console.log(rows);
};

export default validateDB;
