# node-mysql-easy

### Open an issue on GitHub if you notice any bug or want me to add a new feature

# Import

```javascript
const { ConnectToDatabase, QueryDatabase } = require('node-mysql');
```

# To connect to the mysql database <br>

``` javascript
const connectToDatabase = ConnectToDatabase(host,username,password,databasename);
```

# To create instance query database class of table <br>

``` javascript
const queryDatabase = new QueryDatabase(connectToDatabase, tablename);
```

# `Insert` Function Documentation

## Description

The `Insert` function is an asynchronous method that performs an SQL INSERT operation. It takes an object `params` as input, where the keys represent the column names and the values represent the corresponding values to be inserted.

## Parameters

- `params` (object): An object containing key-value pairs representing the column names and values to be inserted into the table.

## Return Value

The function returns the result of the INSERT operation.

## Syntax

```javascript
queryDatabase.Insert(params).then((result) => {
  console.log(result);
});
```

### OR

```javascript
const insertedData = await queryDatabase.Insert(params);
```

## Usage

```javascript
queryDatabase
  .Insert({
    username: "idris",
    password: "password",
    email: "saiduidris15@gmail.com",
  })
  .then((result) => {
    console.log(result);
  });
```

### OR

```javascript
const insertedData = await queryDatabase.Insert({
  username: "idris",
  password: "password",
  email: "saiduidris15@gmail.com",
});
```

# `InsertMultiple` Function Documentation

## Description

The `InsertMultiple` function is an asynchronous function that allows inserting multiple records into a database table. It takes an array of objects as a parameter, where each object represents a set of values to be inserted as a new record.

## Parameters

- `params` (array): An array of objects representing the values to be inserted. Each object should have keys corresponding to the column names and their respective values.

## Return Value

The function returns a Promise that resolves to the query result after executing the insert operation. The result can be any value returned by the database query execution.

## Syntax

```javascript
queryDatabase.InsertMultiple(param).then((result) => {
  console.log(result);
});
```

### OR

```javascript
const insertedData = await queryDatabase.InsertMultiple(param);
```

## Usage

```javascript
queryDatabase
  .InsertMultiple([
    {
      username: "idris",
      password: "password",
      email: "saiduidris15@gmail.com",
    },
    {
      username: "silas",
      password: "milexswags",
      email: "silaso@yahoo.com",
    },
    {
      username: "baba",
      password: "moh210",
      email: "mohbaba@gmail.com",
    },
  ])
  .then((result) => {
    console.log(result);
  });
```

### OR

```javascript
const insertedData = await queryDatabase.InsertMultiple([
  {
    username: "idris",
    password: "password",
    email: "saiduidris15@gmail.com",
  },
  {
    username: "silas",
    password: "milexswags",
    email: "silaso@yahoo.com",
  },
  {
    username: "baba",
    password: "moh210",
    email: "mohbaba@gmail.com",
  },
]);
```

# `Get` Function Documentation

## Description

The `Get` method use to get a value of column

## Parameters

- column_name (string): Specifies the name of the column to retrieve from the table.
- where (string): Specifies the column name to match for the filtering condition.
- value (string): Specifies the value to compare against the where column.
- limit (number, optional): Specifies the maximum number of rows to retrieve. If not provided, all matching rows are returned.

## Return Value

Returns a Promise that resolves to the result of the SQL query execution.

## Usage

Suppose we want to get username where password = milexswags

```javascript
queryDatabase.Get("username", "password", "milexswags", 1).then((result) => {
  console.log(result);
});
```

### OR

```javascript
const getData = await queryDatabase.Get(
  "username",
  "password",
  "milexswags",
  1
);
```

# `GetAdvanced` Function Documentation

## Description

The `GetAdvanced` function is used to retrieve data from a database table based on advanced filtering conditions. It supports filtering with multiple AND and OR conditions. The function constructs the SQL query dynamically based on the provided parameters and executes the query using a database connection. The query result is then returned.

## Syntax

```javascript
queryDatabase.GetAdvanced(params, limit).then((result) => {
  console.log(result);
});
```

## Parameters

- `params` (object): An object containing the parameters for the advanced query.
- - `column_name` (array of strings): An array specifying the columns to retrieve from the table.
- - `and` (object, optional): An object representing the AND conditions for the query.
- - `or` (object, optional): An object representing the OR conditions for the query.
- - `joinwith` (string, optional): Specifies the logical operator to join the AND and OR conditions ("and" or "or"). Defaults to "or".
- - `debug` (boolean, optional): If set to true, the constructed SQL query will be logged to the console for debugging purposes.
- `limit` (number, optional): The maximum number of rows to retrieve from the table. Defaults to null, which retrieves all matching rows.

```javascript
queryDatabase
  .GetAdvanced({
    column_names: ["username,email"],
    and: {
      password: "password",
      name: "idris",
    },
    or: {
      username: "idris",
      name: "silas",
    },
    joinwith: "or",
    debug: true,
  })
  .then((result) => {
    console.log(result);
  });
```

# `GetAll` Function Documentation

## Description

'GetAll' retrieves data from a database table. It allows fetching all records from the table or a specified number of records using an optional limit parameter.

## Parameters

- `limit` (optional): A number indicating the maximum number of records to retrieve. If not provided or set to null, all records from the table will be fetched.

## Return Value

The method returns a Promise that resolves to the result of the executed query. The result contains the retrieved records from the database table.

## Usage

```javascript
queryDatabase.GetAll().then((result) => {
  console.log(result);
});
```

### OR

```javascript
const insertedData = await queryDatabase.GetAll();
```

# `Update` Function Documentation

## Description

The `Update` method use to update a value of column

## Parameters

- column_name (string): Specifies the name of the column to update from the table.
- where (string): Specifies the column name to match for the filtering condition.
- value (string): Specifies the value to compare against the where column.
- limit (number, optional): Specifies the maximum number of rows to update. If not provided, all matching rows are returned.

## Return Value

Returns a Promise that resolves to the result of the SQL query execution.

## Usage

Suppose we want to update username where password = milexswags

```javascript
queryDatabase.Update("username", "password", "milexswags", 1).then((result) => {
  console.log(result);
});
```

### OR

```javascript
const updateData = await queryDatabase.Update(
  "username",
  "password",
  "milexswags",
  1
);
```

# `UpdateAdvanced` Function Documentation

## Description

The `GetAdvanced` function is used to update data from a database table based on advanced filtering conditions. It supports filtering with multiple AND and OR conditions. The function constructs the SQL query dynamically based on the provided parameters and executes the query using a database connection. The query result is then returned.

## Syntax

```javascript
queryDatabase.UpadateAdvanced(params, limit).then((result) => {
  console.log(result);
});
```

## Parameters

- `params` (object): An object containing the parameters for the advanced query.
- - `update` (object): An object specifying the columns and the value you want to set.
- - `and` (object, optional): An object representing the AND conditions for the query.
- - `or` (object, optional): An object representing the OR conditions for the query.
- - `joinwith` (string, optional): Specifies the logical operator to join the AND and OR conditions ("and" or "or"). Defaults to "or".
- - `debug` (boolean, optional): If set to true, the constructed SQL query will be logged to the console for debugging purposes.
- `limit` (number, optional): The maximum number of rows to retrieve from the table. Defaults to null, which retrieves all matching rows.

```javascript
queryDatabase
  .UpdateAdvanced({
    update: {
      username: "baba",
      email: "mohbaba@gmail.com",
    },
    and: {
      password: "password",
      name: "baba",
    },
    or: {
      password: "password",
      age: 15,
    },
    debug: true,
  })
  .then((result) => {
    console.log(result);
  });
```

### or

```javascript
const udatedData = await queryDatabase.UpdateAdvanced({
  update: {
    username: "baba",
    email: "mohbaba@gmail.com",
  },
  and: {
    password: "password",
    name: "baba",
  },
  or: {
    password: "password",
    age: 15,
  },
  debug: true,
});
```

# `UpdateAll` Function Documentation

## Description

'UpdateAll' updates data from a database table. It allows fetching all records from the table or a specified number of records using an optional limit parameter.

## Parameters

- `limit` (optional): A number indicating the maximum number of records to update. If not provided or set to null, all records from the table will be fetched.

## Return Value

The method returns a Promise that resolves to the result of the executed query. The result contains the updated records from the database table.

## Usage

```javascript
queryDatabase.UpdateAll().then((result) => {
  console.log(result);
});
```

### OR

```javascript
const insertedData = await queryDatabase.UpdateAll();
```

# `Delete` Function Documentation

## Description

The `Delete` method use to delete a value of column

## Parameters

- column_name (string): Specifies the name of the column to delete from the table.
- where (string): Specifies the column name to match for the filtering condition.
- value (string): Specifies the value to compare against the where column.
- limit (number, optional): Specifies the maximum number of rows to delete. If not provided, all matching rows are returned.

## Return Value

Returns a Promise that resolves to the result of the SQL query execution.

## Usage

Suppose we want to delete username where password = milexswags

```javascript
queryDatabase.Delete("username", "password", "milexswags", 1).then((result) => {
  console.log(result);
});
```

### OR

```javascript
const deleteData = await queryDatabase.Delete(
  "username",
  "password",
  "milexswags",
  1
);
```

# `DeleteAdvanced` Function Documentation

## Description

The `GetAdvanced` function is used to delete data from a database table based on advanced filtering conditions. It supports filtering with multiple AND and OR conditions. The function constructs the SQL query dynamically based on the provided parameters and executes the query using a database connection. The query result is then returned.

## Syntax

```javascript
queryDatabase.UpadateAdvanced(params, limit).then((result) => {
  console.log(result);
});
```

## Parameters

- `params` (object): An object containing the parameters for the advanced query.
- - `and` (object, optional): An object representing the AND conditions for the query.
- - `or` (object, optional): An object representing the OR conditions for the query.
- - `joinwith` (string, optional): Specifies the logical operator to join the AND and OR conditions ("and" or "or"). Defaults to "or".
- - `debug` (boolean, optional): If set to true, the constructed SQL query will be logged to the console for debugging purposes.
- `limit` (number, optional): The maximum number of rows to retrieve from the table. Defaults to null, which retrieves all matching rows.

```javascript
queryDatabase
  .DeleteAdvanced({
    and: {
      password: "password",
      name: "baba",
    },
    or: {
      password: "password",
      age: 15,
    },
    debug: true,
  })
  .then((result) => {
    console.log(result);
  });
```

### or

```javascript
const udatedData = await queryDatabase.DeleteAdvanced({
  and: {
    password: "password",
    name: "baba",
  },
  or: {
    password: "password",
    age: 15,
  },
  debug: true,
});
```

# `DeleteAll` Function Documentation

## Description

'DeleteAll' deletes data from a database table. It allows deleting all records from the table or a specified number of records using an optional limit parameter.

## Parameters

- `limit` (optional): A number indicating the maximum number of records to delete. If not provided or set to null, all records from the table will be fetched.

## Return Value

The method returns a Promise that resolves to the result of the executed query. The result contains the deleted records from the database table.

## Usage

```javascript
queryDatabase.DeleteAll().then((result) => {
  console.log(result);
});
```

### OR

```javascript
const insertedData = await queryDatabase.DeleteAll();
```



## Custom SQL: <br>

``` javascript 
queryDatabase
.CustomSQL(sqlString)
.then((result) => {
console.log(result);
});
```

### Example

```` javascript 
queryDatabase
.CustomSQL(SELECT id, name, email
FROM users
WHERE age > 18
ORDER BY name ASC)
.then((result) => {
console.log(result);
});
```
