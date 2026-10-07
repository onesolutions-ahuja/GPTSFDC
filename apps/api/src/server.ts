import { Pool } from "pg";
import { createApp } from "./app.js";
const port=Number(process.env.PORT ?? 10000);
if(!Number.isSafeInteger(port)||port<1||port>65535) throw new Error("Invalid PORT");
const pool=new Pool({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:5000});
const server=createApp(pool).listen(port,()=>console.log("GPTSFDC API listening on "+port));
async function shutdown(){server.close();await pool.end();}
process.once("SIGINT",()=>{void shutdown()});
process.once("SIGTERM",()=>{void shutdown()});
