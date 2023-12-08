import {JSONDB} from '@beforesemicolon/node-json-db';
import {Account} from '../accounts/account.interface';
import {Person} from "../persons/person.interface";

class Database {
    accounts: JSONDB<Account>;
    persons: JSONDB<Person>;

    constructor() {
        this.accounts = new JSONDB<Account>("accounts");
        this.persons = new JSONDB<Person>("persons");
    }

    async createDummyPersonIfNotExists() {
        const personsResult = await this.persons.getAll().run();
        if(personsResult.length == 0) {
            await this.persons.insert({
              personId: 1,
              name: "John Johnson",
              document: "",
              birthDate: new Date(),
            });
            return true;
        }
        return false;
    }
    async getNextAccountId() {
        const accounts = await this.accounts.getAll().run();
        return accounts.length == 0 ? 1 : Math.max(...accounts.map(a => a.accountId ?? 0)) + 1
    }
}

export const db = new Database()