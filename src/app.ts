import { ConnectToDatabase } from "./ConnectToDatabase";
import { QueryDatabase } from "./QueryDatabase";

const connectToDatabase = ConnectToDatabase(
  "localhost",
  "idris",
  "password",
  "node-mysql"
);

const queryDatabase = new QueryDatabase(connectToDatabase,'users')
queryDatabase.Get('username','password','password').then(result=>{
  // console.log(result)
})
queryDatabase.GetAdvanced({
  column_name: ['username,email'],
  where:{
    password:'password',
  }
}).then(result=>{
  console.log(result)
})