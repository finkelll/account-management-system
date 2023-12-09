import express, { Request, Response } from "express";
import {
  blockAccount,
  createAccount,
  depositIntoAccount,
  getAccounts,
  verifyAccount,
  withdrawalFromAccount,
} from "./account";
import { Account, AccountOperationStatus } from "./account.interface";
import { getStatement } from "../transactions/transaction";

export const accountRouter = express.Router();

// Middleware that checks whether the account exists and unblocked
// if not sends 404 response
accountRouter.use("/account/:id", async (request: Request, response, next) => {
  const accountId = +request.params.id;
  // Verify that account exists and it is not blocked
  const accountVerification = await verifyAccount(accountId);
  if (accountVerification.status !== AccountOperationStatus.Success) {
    response.status(404).send(accountVerification);
  } else {
    response.locals.account = accountVerification.account as Account;
    next();
  }
});

// Gets all accounts
accountRouter.get("/accounts", async (_: Request, response: Response) => {
  try {
    const accounts = await getAccounts();

    return response.status(200).json(accounts);
  } catch (error) {
    return response.status(500).json({ error });
  }
});

// Deposits funds into account
// Required fields: AccountId, Amount
accountRouter.put(
  "/account/:id/deposit",
  async (request: Request, response: Response) => {
    try {
      const { amount } = request.body;
      const depositResult = await depositIntoAccount(
        response.locals.account,
        amount,
      );

      return response.status(200).json(depositResult);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

// Withdrawal funds from account
// Required fields: AccountId, Amount
accountRouter.put(
  "/account/:id/withdrawal",
  async (request: Request, response: Response) => {
    try {
      const { amount } = request.body;
      const depositResult = await withdrawalFromAccount(
        response.locals.account,
        amount,
      );

      return response.status(200).json(depositResult);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

// Blocks an account
accountRouter.put(
  "/account/:id/block",
  async (_: Request, response: Response) => {
    try {
      const blockAccountResult = await blockAccount(
        response.locals.account.accountId,
      );

      return response.status(200).json(blockAccountResult);
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

// Gets an account balance
accountRouter.get(
  "/account/:id/balance",
  async (_: Request, response: Response) => {
    try {
      return response.status(200).json({
        balance: response.locals.account.balance,
      });
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

// Gets account's statement
accountRouter.get(
  "/account/:id/statement",
  async (request: Request, response: Response) => {
    try {
      const fromDate = request.query.fromDate
        ? new Date(request.query.fromDate.toString())
        : (null as never);
      const toDate = request.query.toDate
        ? new Date(request.query.toDate.toString())
        : (null as never);
      const statement = await getStatement(
        response.locals.account,
        fromDate,
        toDate,
      );
      return response.status(200).json({
        statement: statement,
        status: AccountOperationStatus.Success,
      });
    } catch (error) {
      return response.status(500).json({ error });
    }
  },
);

// Creates a new account
// Required fields: PersonId, AccountType
// Optional fields: Balance (default=0), DailyWithdrawalLimit (default=1000)
accountRouter.post("/account", async (request: Request, response: Response) => {
  try {
    const { personId, accountType, balance, dailyWithdrawalLimit } =
      request.body;

    const createAccountResult = await createAccount(
      personId,
      accountType,
      balance,
      dailyWithdrawalLimit,
    );

    return response.status(200).json(createAccountResult);
  } catch (error) {
    return response.status(500).json({ error });
  }
});
