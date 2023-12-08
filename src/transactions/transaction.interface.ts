export interface Transaction {
    transactionId: number,
    accountId: number,
    value: number,
    transactionData: Date
}

export enum TransactionStatus {
    Success,
    AccountNotExists
}