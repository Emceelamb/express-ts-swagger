import { Example, Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("ping")
export default class PingController {
  /**
   * Test if API is online.
   */
  @Example<PingResponse>({
    message: "pong",
  })
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}
