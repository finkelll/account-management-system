export interface Account {
    accountId: number;
    personId: number;
    balance: number;
    dailyWithdrawalLimit: number;
    activeFlag: boolean;
    accountType: number;
    createDate: Date;
}

export enum AccountCreationStatus {
    Success,
    MissingPersonId,
    MissingAccountType
}