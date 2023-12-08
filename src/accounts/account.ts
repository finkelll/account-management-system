import {db} from '../database/database'
import {Account, AccountCreationStatus} from "./account.interface";
export const getAccounts = async () => {
    return await db.accounts.getAll().run()
}

export const createAccount = async (account: Account) => {
    if(!account.personId) {
        return {
            status: AccountCreationStatus.MissingPersonId
        };
    } else if(!account.accountType) {
        return { 
            status: AccountCreationStatus.MissingAccountType 
        };
    }

    if(account.balance === null) {
        account.balance = 0;
    }
    if(account.dailyWithdrawalLimit === null) {
        account.dailyWithdrawalLimit = 1000;
    }

    account.accountId = await db.getNextAccountId();
    account.activeFlag = true;
    account.createDate = new Date();

    await db.accounts.insert(account);

    return { account: account , status: AccountCreationStatus.Success};
}