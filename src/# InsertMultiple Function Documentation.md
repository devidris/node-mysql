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