/** Generic platform contracts. No business-object-specific logic is allowed. */
export type FieldKind = "text" | "number" | "boolean" | "date" | "datetime" | "email" | "url" | "picklist" | "lookup";
export interface FieldDefinition {
  key: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  unique?: boolean;
  options?: readonly string[];
  targetObject?: string;
}
export interface ObjectDefinition {
  key: string;
  label: string;
  fields: readonly FieldDefinition[];
  version: number;
}
export interface ValidationIssue {
  path: string;
  code: "INVALID_KEY" | "DUPLICATE_FIELD" | "MISSING_LABEL" | "INVALID_VERSION" | "MISSING_OPTIONS" | "MISSING_TARGET";
  message: string;
}
const keyPattern = /^[a-z][a-z0-9_]*$/;
export function validateObjectDefinition(def: ObjectDefinition): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!keyPattern.test(def.key)) issues.push({path:"key",code:"INVALID_KEY",message:"Object key must be lowercase snake_case"});
  if (!def.label.trim()) issues.push({path:"label",code:"MISSING_LABEL",message:"Object label is required"});
  if (!Number.isSafeInteger(def.version) || def.version < 1) issues.push({path:"version",code:"INVALID_VERSION",message:"Version must be a positive integer"});
  const seen = new Set<string>();
  for (const [i, field] of def.fields.entries()) {
    const path = `fields[${i}]`;
    if (!keyPattern.test(field.key)) issues.push({path:`${path}.key`,code:"INVALID_KEY",message:"Field key must be lowercase snake_case"});
    if (seen.has(field.key)) issues.push({path:`${path}.key`,code:"DUPLICATE_FIELD",message:"Duplicate field key"});
    seen.add(field.key);
    if (!field.label.trim()) issues.push({path:`${path}.label`,code:"MISSING_LABEL",message:"Field label is required"});
    if (field.kind === "picklist" && (!field.options || field.options.length === 0)) issues.push({path:`${path}.options`,code:"MISSING_OPTIONS",message:"Picklist options are required"});
    if (field.kind === "lookup" && !field.targetObject) issues.push({path:`${path}.targetObject`,code:"MISSING_TARGET",message:"Lookup target is required"});
  }
  return issues;
}
export interface ExecutionContext {
  tenantId: string;
  actorId: string;
  correlationId: string;
}
export type PlatformOperation = "create" | "read" | "update" | "delete" | "list";
export interface RecordCommand {
  context: ExecutionContext;
  objectKey: string;
  operation: PlatformOperation;
  recordId?: string;
  values?: Readonly<Record<string, unknown>>;
}
export interface PermissionGrant {
  objectKey: string;
  operations: readonly PlatformOperation[];
  readableFields: readonly string[];
  writableFields: readonly string[];
}
export function canExecute(grants: readonly PermissionGrant[], objectKey: string, operation: PlatformOperation): boolean {
  return grants.some(grant => grant.objectKey === objectKey && grant.operations.includes(operation));
}
