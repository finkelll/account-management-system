import { JSONDB } from "@beforesemicolon/node-json-db";
import { Account } from "../accounts/account.interface";
import { Person } from "../persons/person.interface";
import { Transaction } from "../transactions/transaction.interface";

class Database {
  accounts: JSONDB<Account>;
  persons: JSONDB<Person>;
  transactions: JSONDB<Transaction>;

  constructor() {
    this.accounts = new JSONDB<Account>("accounts");
    this.persons = new JSONDB<Person>("persons");
    this.transactions = new JSONDB<Transaction>("transactions");
  }

  async createDummyPersonIfNotExists() {
    const personsResult = await this.persons.getAll().run();
    if (personsResult.length == 0) {
      await this.persons.insert({
        personId: 1,
        name: "John Johnson",
        document: "",
        birthDate: new Date(),
      });
      await this.persons.insert({
        personId: 2,
        name: "Judy Becks",
        document: "",
        birthDate: new Date(),
      });
      await this.persons.insert({
        personId: 3,
        name: "George Foo",
        document: "",
        birthDate: new Date(),
      });
      await this.persons.insert({
        personId: 4,
        name: "Marry Parks",
        document: "",
        birthDate: new Date(),
      });
      await this.persons.insert({
        personId: 5,
        name: "Hugh Bo",
        document: "",
        birthDate: new Date(),
      });
      return true;
    }
    return false;
  }
  async getNextAccountId() {
    const accounts = await this.accounts.getAll().run();
    return accounts.length == 0
      ? 1
      : Math.max(...accounts.map((a) => a.accountId ?? 0)) + 1;
  }
  async getNextTransactionId() {
    const transactions = await this.transactions.getAll().run();
    return transactions.length == 0
      ? 1
      : Math.max(...transactions.map((t) => t.transactionId ?? 0)) + 1;
  }
}

export const db = new Database();
