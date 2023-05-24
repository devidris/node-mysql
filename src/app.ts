import { ConnectToDatabase } from "./ConnectToDatabase";
import { QueryDatabase } from "./QueryDatabase";

const connectToDatabase = ConnectToDatabase(
  "localhost",
  "idris",
  "password",
  "node-mysql"
);

const queryDatabase = new QueryDatabase(connectToDatabase, "users");
queryDatabase.Get("username", "password", "password").then((result) => {
  // console.log(result)
});
queryDatabase
  .GetAdvanced({
    column_name: ["username,email"],
    where: {
      password: "password",
    },
  })
  .then((result) => {
    // console.log(result)
  });

queryDatabase.GetAll(1).then((result) => {
  // console.log(result)
});

// queryDatabase
//   .Insert({
//     username: "idris",
//     password: "password",
//     email: "saiduidris15@gmail.com",
//   })
//   .then((result) => {
//     // console.log(result);
//   });

// queryDatabase
//   .InsertMultiple([
//     {
//       username: "idris",
//       password: "password",
//       email: "saiduidris15@gmail.com",
//     },
//     {
//       username: "idris",
//       password: "password",
//       email: "saiduidris13@gmail.com",
//     },
//     {
//       username: "idris",
//       password: "password",
//       email: "saiduidris176@gmail.com",
//     },
//   ])
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase
//   .Update("username", "idris", "username", "saidu", 1)
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase
//   .UpdateAdvanced(
//     {
//       update: {
//         username: "password",
//         email: "idris",
//       },
//       where: {
//         password: "password",
//         email: "saiduidris15@gmail.com",
//       },
//     },
//     1
//   )
//   .then((result) => {
//     console.log(result);
//   });

queryDatabase
  .UpdateAll(
    {
      username: "password",
      email: "idris",
    },
    1
  )
  .then((result) => {
    console.log(result);
  });
