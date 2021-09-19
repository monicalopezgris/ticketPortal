import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { newTicketRouter } from "./routes/newTicket";
import { NotFoundError } from "@ticketportalgr/common";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    name: "session",
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(newTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

export { app };
