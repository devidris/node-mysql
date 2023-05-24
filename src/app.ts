import { ConnectToDatabase } from "./ConnectToDatabase";
import { QueryDatabase } from "./QueryDatabase";

const connectToDatabase = ConnectToDatabase(
  "localhost",
  "idris",
  "password",
  "node-mysql"
);

const queryDatabase = new QueryDatabase(connectToDatabase,'users')
queryDatabase.Get('username','password','password',2).then(result=>{
  console.log(result)
})
