import express from "express";
import PingController from "../controllers/ping";
import QuoteController from "../controllers/quote";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/quote/:id?", async (_req, res) => {
  const controller = new QuoteController();
  const { id } = _req.params;
  const response = await controller.getQuote(id);
  return res.send(response);
});

export default router;
