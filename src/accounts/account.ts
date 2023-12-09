import { db } from "../database/database";
import {
  Account,
  AccountCreationStatus,
  AccountOperationStatus,
} from "./account.interface";
import { getPerson } from "../persons/person";
import { insertTransaction } from "../transactions/transaction";
import { TransactionStatus } from "../transactions/transaction.interface";

// Verifies account exists and checks whether it is blocked
// Returns the verification status or the Account object (if exists)
export const verifyAccount = async (accountId: number) => {
  if (!accountId) {
    return { status: AccountOperationStatus.MissingAccountId };
  }

  const account = (await getAccount(accountId)) as Account;
  // Verify account exists
  if (account === null) {
    return { status: AccountOperationStatus.AccountNotFound };
  } else if (!account.activeFlag) {
    return { status: AccountOperationStatus.AccountIsBlocked };
  }
  return {
    account: account,
    status: AccountOperationStatus.Success,
  };
};

// Get all accounts
export const getAccounts = async () => {
  return await db.accounts.getAll().run();
};

// Get account by accountId
export const getAccount = async (accountId: number) => {
  return await db.accounts.getOne().where("accountId").equals(accountId).run();
};

// Creates a new account
export const createAccount = async (
  personId: number,
  accountType: number,
  balance: number,
  dailyWithdrawalLimit: number,
) => {
  if (!personId) {
    return {
      status: AccountCreationStatus.MissingPersonId,
    };
  } else if (!accountType) {
    return {
      status: AccountCreationStatus.MissingAccountType,
    };
  }

  // Checks if Person exists
  const person = await getPerson(personId);
  if (person === null) {
    return {
      status: AccountCreationStatus.PersonNotFound,
    };
  }

  // Creates an Account object and stores in DB
  const account = {} as Account;
  account.accountId = await db.getNextAccountId();
  account.personId = personId;
  account.accountType = accountType;

  if (!balance) {
    account.balance = 0;
  }
  if (!dailyWithdrawalLimit) {
    account.dailyWithdrawalLimit = 1000;
  }

  account.activeFlag = true;
  account.createDate = new Date();

  await db.accounts.insert(account);

  // Returns the created account
  return { account: account, status: AccountCreationStatus.Success };
};

export const blockAccount = async (accountId: number) => {
  await db.accounts
    .updateOne({ activeFlag: false })
    .where("accountId")
    .equals(accountId)
    .run();
  return {
    status: AccountOperationStatus.Success,
  };
};

// Performs a transaction on account
// Inserts a new transaction and changes account balance
const performTransaction = async (account: Account, amount: number) => {
  if (!amount) {
    return {
      status: AccountOperationStatus.MissingAmount,
    };
  }
  // Inserts the deposit transaction into DB
  const transactionResult = await insertTransaction(account.accountId, amount);

  if (transactionResult.status !== TransactionStatus.Success) {
    return {
      status: transactionResult.status,
    };
  }

  // Updates the current account's balance
  await db.accounts
    .updateOne({ balance: amount + account.balance })
    .where("accountId")
    .equals(account.accountId)
    .run();

  return {
    status: AccountOperationStatus.Success,
  };
};

// Deposit into account
export const depositIntoAccount = async (account: Account, amount: number) => {
  return await performTransaction(account, amount);
};

// Withdrawal from account
export const withdrawalFromAccount = async (
  account: Account,
  amount: number,
) => {
  // Check account balance
  if (account.balance < amount) {
    return { status: AccountOperationStatus.InsufficientFunds };
  }

  return await performTransaction(account, amount * -1);
};
