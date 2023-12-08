# Account Management System
## Database
Using a library @beforesemicolon/node-json-db which creates and handles a json file based database.
This is just for testing the API purpose - and should not be used in a real project.

### Installing The Database
To install the database with mock data run the terminal command
```shell
npm run db:create
```

### Sample Create Account Request
```json
{
    "personId": "1",
    "accountType": "1"
}
```