import { db } from "../database/database";
import { Transaction, TransactionStatus } from "./transaction.interface";
import { Account } from "../accounts/account.interface";

// Inserts a transaction to DB, returns status of insert
export const insertTransaction = async (accountId: number, value: number) => {
  const transaction = {} as Transaction;
  transaction.transactionId = await db.getNextTransactionId();
  transaction.accountId = accountId;
  transaction.value = value;
  transaction.transactionDate = new Date();

  await db.transactions.insert(transaction);

  return {
    status: TransactionStatus.Success,
    transaction: transaction,
  };
};

// Gets transactions list for account
export const getTransactions = async (accountId: number) => {
  return await db.transactions
    .getAll()
    .where("accountId")
    .equals(accountId)
    .run();
};

// Gets a statement
export const getStatement = async (
  account: Account,
  fromDate: Date,
  toDate: Date,
) => {
  const transactions = await getTransactions(account.accountId);
  return transactions.flatMap((t) => {
    const transaction = t as Transaction;
    if (
      (!fromDate || new Date(transaction.transactionDate) >= fromDate) &&
      (!toDate || new Date(transaction.transactionDate) <= toDate)
    ) {
      // Formats the value into a currency styled string representation
      const valueFormatter = new Intl.NumberFormat("eb-US", {
        style: "currency",
        currency: "USD",
      });
      return {
        transactionId: transaction.transactionId,
        action: transaction.value > 0 ? "Deposit" : "Withdrawal",
        value: valueFormatter.format(Math.abs(transaction.value / 100)),
        date: transaction.transactionDate,
      };
    } else return [];
  });
};
