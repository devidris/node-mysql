# node-mysql-easy
## Open an issue in the github if you notice any bug or want me to add an new feature

# Import

`const {ConnectToDatabase,QueryDatabase} = require('node-mysql')`

# To connect to the mysql database <br>

`const connectToDatabase = ConnectToDatabase(host,username,password,databasename);`

# To create instance query database class of table <br>

`const queryDatabase = new QueryDatabase(connectToDatabase, tablename);`

# To insert a single row into the table: <br>

`queryDatabase.Insert({
    columnname1: value,
    columname2: value,
   columnname3: value,
  }).then((result) => {
    console.log(result);
  });`

## Example: <br>

`queryDatabase.Insert({
    username: "idris",
    password: "password",
    email: "saiduidris15@gmail.com",
  }).then((result) => {
    console.log(result);
  });`

# To insert a multiple rows into the table: <br>

`queryDatabase.InsertMultiple([
    {
       columnname1: value,
       columnname2: value,
     columnname3:value,
    },
    {
       columnname1: value,
       columnname2: value,
      columnname3:value,
    },
    {
      columnname1: value,
       columnname2: value,
     columnname3: value,
    },
  ]).then((result) => {
    console.log(result);
  });`

## Example:<br>

`queryDatabase.InsertMultiple([
    {
      username: "idris",
      password: "idrisIdris",
      email: "saiduidris15@gmail.com",
    },
    {
      username: "silas",
      password: "milexswags",
      email: "silassilas13@yahoo.com",
    },
    {
      username: "mirabel",
      password: "chichi",
      email: "mirabelchi176@gmail.com",
    },
  ]).then((result) => {
    console.log(result);
  });`

# To get data from database: <br>

## Let say you want to get all data from database<br>

`queryDatabase.GetAll().then((result) => {
 console.log(result)
 });`

## Let say you want to get all data from database but limit to return only 2 rows<br>

`queryDatabase.GetAll(2).then((result) => {
 console.log(result)
 });`

## Let say i want to get username where password is equal to idrisIdris<br>

`queryDatabase.Get("username", "password", "idrisIdris").then((result) => {
  console.log(result)
});`

## Let say i want to get username where password is equal to idrisIdris and limit that data to 2 rows<br>

`queryDatabase.Get("username", "password", "idrisIdris",2).then((result) => {
  console.log(result)
});`

## Let say i want to get username and email with where password = 'idrisIdris' and username ='idris'

`queryDatabase
  .GetAdvanced({
    column_name: ["username,email"],
    where: {
      password: "idrisIdris",
      username:"idris"
    },
  })
  .then((result) => {
    console.log(result)
  });`

# To update table: <br>

## Let say i want to update all username to 'idris' and email to 'saiduidris13@gmail.com'

`queryDatabase
  .UpdateAll(
    {
      username: "idris",
      email: "saiduidris13@gmail.com",
    },
  )
  .then((result) => {
    console.log(result);
  });`

## Let say i want to update all username to 'idris' and email to 'saiduidris13@gmail.com' and limit updated data to 5

`queryDatabase
  .UpdateAll(
    {
      username: "idris",
      email: "saiduidris13@gmail.com",
    },5
  )
  .then((result) => {
    console.log(result);
  });`

## Let say i want to update value 'idris' to username where username = 'saidu'

`queryDatabase
  .Update("username", "idris", "username", "saidu")
  .then((result) => {
    console.log(result);
  });`

## Let say i want to insert value 'idris' to username where username = 'saidu' and limit updated data to 3

`queryDatabase
  .Update("username", "idris", "username", "saidu",3)
  .then((result) => {
    console.log(result);
  });`

## Let say you want to update username and email where password = "idrisIdris" and email = "saiduiidris15@gmail.com"

`queryDatabase
  .UpdateAdvanced(
    {
      update: {
        username: "password",
        email: "idris",
      },
      where: {
        password: "password",
        email: "saiduidris15@gmail.com",
      },
    }
  )
  .then((result) => {
    console.log(result);
  });
`

## Let say you want to update username and email where password = "idrisIdris" and email = "saiduiidris15@gmail.com" and limit updated data to 2

`queryDatabase
  .UpdateAdvanced(
    {
      update: {
        username: "password",
        email: "idris",
      },
      where: {
        password: "password",
        email: "saiduidris15@gmail.com",
      },
    },
    2
  )
  .then((result) => {
    console.log(result);
  });
`

# To Delete table: <br>

## Let say i want to delete table "users" <br>

`queryDatabase
  .DeleteAll(
    'users'
  )
  .then((result) => {
    console.log(result);
  });`

## Let say i want to delete table where username = 'idris'

`queryDatabase
.Delete(
'username','idris',

)
.then((result) => {
console.log(result);
});`

## Let say i want to delete table where username = 'idris', limit deleted data to 2

`queryDatabase
.Delete(
'username','idris',2

)
.then((result) => {
console.log(result);
});`

## Let say i want to delete table where username = 'idris' and email = 'saiduidris13@gmail.com'`queryDatabase

.DeleteAdvanced(
{
username: "password",
email: "saiduidris13@gmail.com",
}
)
.then((result) => {
console.log(result);
});
`

## Let say i want to delete table where username = 'idris' and email = 'saiduidris13@gmail.com' and limit deleted data to 3

`queryDatabase
  .DeleteAdvanced(
    {
      username: "password",
      email: "saiduidris13@gmail.com"
    },
    3
  )
  .then((result) => {
    console.log(result);
  });
`

# Custom SQL: <br>

`queryDatabase
.CustomSQL(sqlString)
.then((result) => {
console.log(result);
});`

## Example

`queryDatabase
.CustomSQL(SELECT id, name, email
FROM users
WHERE age > 18
ORDER BY name ASC)
.then((result) => {
console.log(result);
});`
