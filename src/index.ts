import express from "express";
import {accountRouter} from "./accounts/account.routes";
import {transactionRouter} from "./transactions/transaction.routes";
import {db} from "./database/database";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', accountRouter)
app.use('/', transactionRouter)

// This code creates a new dummy person if no person exist
db.createDummyPersonIfNotExists().then()

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
