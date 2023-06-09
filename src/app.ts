import { ConnectToDatabase } from "./ConnectToDatabase";
import { QueryDatabase } from "./QueryDatabase";

module.exports = {
  ConnectToDatabase,
  QueryDatabase,
};
const connectToDatabase = ConnectToDatabase(
  "localhost",
  "idris",
  "password",
  "node-mysql"
);

const queryDatabase = new QueryDatabase(connectToDatabase, "users");
// queryDatabase
//   .Insert({
//     username: "idris",
//     password: "password",
//     email: "saiduidris15@gmail.com",
//   })
//   .then((result) => {
//     console.log(result);
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
// queryDatabase.Get("username", "password", "password",1).then((result) => {
//   console.log(result)
// });
// queryDatabase
//   .GetAdvanced({
//     column_names: ["username,email"],
//     and: {
//       password: "password",
//       name: "idris",
//     },
//     or: {
//       username: "idris",
//       name: "silas",
//     },
//     joinwith: "or",
//     debug: true,
//   })
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase.GetAll(1).then((result) => {
//   console.log(result)
// });

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
//       and: {
//         password: "password",
//         email: "saiduidris15@gmail.com",
//       },
//       or: {
//         password: "password",
//         email: "saiduidris15@gmail.com",
//       },
//       debug:true
//     },
//     1
//   )
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase
//   .UpdateAll(
//     {
//       username: "password",
//       email: "idris",
//     },
//     1
//   )
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase
//   .Delete(
//     'username','password',

//   )
//   .then((result) => {
//     console.log(result);
//   });
// queryDatabase
//   .DeleteAdvanced(
//     {
//       or:{
//         username: "password",
//         name:'idris'
//       }
//     },
//     1
//   )
//   .then((result) => {
//     console.log(result);
//   });

// queryDatabase
//   .DeleteAll(
//     'users'
//   )
//   .then((result) => {
//     console.log(result);
//   });
