import express from "express";
import { accountRouter } from "./accounts/account.routes";
import { db } from "./database/database";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", accountRouter);

// This code creates a new dummy person if no person exist
db.createDummyPersonIfNotExists().then();

export const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
