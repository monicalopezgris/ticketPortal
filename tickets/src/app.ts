import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@ticketportalgr/common";

import { newTicketRouter } from "./routes/newTicket";
import { getTicketRouter } from "./routes/getTicket";
import { updateTicketRouter } from "./routes/updateTicket";
import { getAllTicketRouter } from "./routes/getAllTicket";

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
app.use(currentUser);

app.use(getTicketRouter);
app.use(newTicketRouter);
app.use(getAllTicketRouter);
app.use(updateTicketRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
