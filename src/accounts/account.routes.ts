import express, {Request, Response} from 'express'
import {createAccount, getAccounts} from './account'
import {Account, AccountCreationStatus} from "./account.interface";

export const accountRouter = express.Router()

// Gets all accounts
accountRouter.get('/accounts', async (request: Request, response: Response) => {
    try {
        const accounts = await getAccounts()

        return response.status(200).json(accounts)
    } catch (error) {
        return response.status(500).json({error})
    }
})

// Inserts a new account
// Required fields: PersonId, AccountType
// Optional fields: Balance (default=0), DailyWithdrawalLimit (default=1000)
accountRouter.post('/account', async (request: Request, response: Response) => {
    try {
        const account: Account = request.body

        const createAccountResult = await createAccount(account)
        return response.status(200).json(createAccountResult)

    } catch (error) {
        return response.status(500).json({error})
    }
})

