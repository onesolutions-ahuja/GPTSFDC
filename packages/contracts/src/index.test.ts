import { test } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { validateObjectDefinition, canExecute } from "./index.ts";
test("valid metadata passes", () => {
  deepEqual(validateObjectDefinition({key:"custom_object",label:"Custom Object",version:1,fields:[{key:"display_name",label:"Display Name",kind:"text"}]}),[]);
});
test("duplicate field keys are rejected", () => {
  const issues = validateObjectDefinition({key:"example",label:"Example",version:1,fields:[{key:"name",label:"Name",kind:"text"},{key:"name",label:"Again",kind:"text"}]});
  equal(issues.some(issue=>issue.code==="DUPLICATE_FIELD"),true);
});
test("permissions default deny", () => {
  equal(canExecute([],"example","read"),false);
  equal(canExecute([{objectKey:"example",operations:["read"],readableFields:[],writableFields:[]}],"example","delete"),false);
});
