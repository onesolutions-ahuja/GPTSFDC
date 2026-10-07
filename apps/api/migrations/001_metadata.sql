BEGIN;
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY,
  name text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS metadata_objects (
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  object_key text NOT NULL CHECK (object_key ~ '^[a-z][a-z0-9_]*$'),
  version integer NOT NULL CHECK (version > 0),
  definition jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id,object_key,version)
);
CREATE TABLE IF NOT EXISTS generic_records (
  tenant_id uuid NOT NULL REFERENCES tenants(id),
  object_key text NOT NULL,
  record_id uuid NOT NULL,
  values_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  revision integer NOT NULL DEFAULT 1 CHECK (revision > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id,object_key,record_id)
);
CREATE INDEX IF NOT EXISTS generic_records_object_idx ON generic_records(tenant_id,object_key);
COMMIT;
