import {db} from "../database/database";
import {TransactionStatus} from "./transaction.interface";

// Inserts a transaction to DB, returns status of insert
export const insertTransaction = async (accountId: number, value: number) => {
    const account = await db.accounts.getOne().where('accountId').equals(accountId).run()

    if(account == null) {
        return {
            status: TransactionStatus.AccountNotExists
        };
    }
    return {
        status: TransactionStatus.Success
    };
}