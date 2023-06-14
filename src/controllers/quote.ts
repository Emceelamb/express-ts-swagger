import { Example, Get, Route, Path, Query } from "tsoa";
import { Database } from "sqlite3";
const db = new Database("./src/database/db.sqlite");

interface Quote {
  id: number;
  created_at: string;
  author: string;
  quote: string;
}

interface QuoteResponse {
  quotes: Array<Quote>;
}

@Route("quote")
export default class QuoteController {
  @Example<QuoteResponse>({
    quotes: [
      {
        id: 1,
        author: "Author Authorsson",
        quote: "He once said something.",
        created_at: "2023-06-13 00:00:00",
      },
    ],
  })
  @Get("{id}")
  public async getQuote(@Query() id?: string): Promise<QuoteResponse> {
    if (!id) {
      const rows: Array<Quote> = await new Promise((resolve, reject) => {
        db.all("SELECT * from quotes", (err, row: Array<Quote>) => {
          if (err) reject(err);
          resolve(row);
        });
      });
      return {
        quotes: rows,
      };
    }
    const rows: Array<Quote> = await new Promise((resolve, reject) => {
      db.all(
        "SELECT * from quotes where id = ?",
        id,
        (err, row: Array<Quote>) => {
          if (err) reject(err);
          resolve(row);
        }
      );
    });
    return {
      quotes: rows,
    };
  }
}
