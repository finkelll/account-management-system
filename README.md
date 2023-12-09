# Account Management System
## Database
* Using a library @beforesemicolon/node-json-db which creates and handles a json file based database.
* This is just for testing the API purpose - and should not be used in a real project.
* JSON files are stored in .json-db-data folder.
* When server is started, if no person exists in persons table, 5 dummy persons are created
* To add a new person manually, simply add to the array in persons.json file a JSON object in the following format:
```json
{
  "personId": 1,
  "name": "John Johnson",
  "document": "",
  "birthDate": "2023-12-08T14:10:55.1245"
}
```

## API Methods
### Create Account

| Path   | /account |
|--------|----------|
| Method | POST     |

#### Sample request JSON
```json
{
    "personId": 1,
    "accountType": 1
}
```

### Get Account Balance
| Path   | /account/{accountId}/balance |
|--------|------------------------------|
| Method | GET                          |

### Deposit Into Account
| Path   | /account/{accountId}/deposit |
|--------|------------------------------|
| Method | PUT                          |

#### Sample request JSON
```json
{
  "amount": 10000
}
```
### Withdrawal From Account
| Path   | /account/{accountId}/withdrawal |
|--------|---------------------------------|
| Method | PUT                             |

#### Sample request JSON
```json
{
  "amount": 10000
}
```
### Block Account
| Path   | /account/{accountId}/block |
|--------|----------------------------|
| Method | PUT                        |

#### Sample request JSON
```json
{
  "amount": 10000
}
```
### Get Statement (All or by period)
* **fromDate** and **toDate** parameters are optional
* Dates are in format *yyyy-mm-yy**T**HH-MM-ss*
* Example: **/account/1/statement&fromDate=2023-09-08T08:30**

| Path   | /account/{accountId}/statement&fromDate={fromDate}&toDate={toDate} |
|--------|--------------------------------------------------------------------|
| Method | GET                                                                |