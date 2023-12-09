export interface Transaction {
  transactionId: number;
  accountId: number;
  value: number; // Value in cents
  transactionDate: Date;
}

export enum TransactionStatus {
  Success,
  AccountNotExists,
}
