import express, {Request, Response} from 'express'
import {insertTransaction} from './transaction'

export const transactionRouter = express.Router()

// Gets all accounts
transactionRouter.get('/transactions', async (request: Request, response: Response) => {
    try {
        const insertTransactionStatus = await insertTransaction(1, 10)

        return response.status(200).json(insertTransactionStatus)
    } catch (error) {
        return response.status(500).json({error})
    }
})