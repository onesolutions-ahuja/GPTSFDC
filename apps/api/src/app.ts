import express from "express";
import { Pool } from "pg";
import { z } from "zod";
import { validateObjectDefinition, type ObjectDefinition } from "@gptsfdc/contracts";

const fieldSchema = z.object({
  key:z.string(), label:z.string(), kind:z.enum(["text","number","boolean","date","datetime","email","url","picklist","lookup"]),
  required:z.boolean().optional(), unique:z.boolean().optional(), options:z.array(z.string()).optional(), targetObject:z.string().optional()
});
const objectSchema = z.object({key:z.string(),label:z.string(),version:z.number().int(),fields:z.array(fieldSchema)});
export function createApp(pool: Pool) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({limit:"100kb"}));
  app.get("/health",(_req,res)=>res.json({status:"ok"}));
  // No metadata mutation endpoint is exposed before real identity, tenant and RBAC enforcement.
  app.get("/ready",async(_req,res)=>{
    try { await pool.query("SELECT 1"); res.json({status:"ready"}); }
    catch { res.status(503).json({status:"unavailable"}); }
  });
  app.post("/internal/validate-object",(req,res)=>{
    const parsed=objectSchema.safeParse(req.body);
    if(!parsed.success){res.status(400).json({valid:false,issues:parsed.error.issues});return;}
    const issues=validateObjectDefinition(parsed.data as ObjectDefinition);
    res.status(issues.length?422:200).json({valid:issues.length===0,issues});
  });
  app.use((_req,res)=>res.status(404).json({error:"NOT_FOUND"}));
  return app;
}
