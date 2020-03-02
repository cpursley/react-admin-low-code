CREATE USER hasurauser WITH LOGIN;
ALTER USER hasurauser WITH PASSWORD 'hasurauser_password';
-- Grant user Postgres role membership of hasurauser (needed explictly for managed SQL services)
GRANT hasurauser TO postgres;

-- create pgcrypto extension, required for UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- create the schemas required by the hasura system
CREATE SCHEMA IF NOT EXISTS hdb_catalog;
CREATE SCHEMA IF NOT EXISTS hdb_views;

-- make the user an owner of hasura schemas
ALTER SCHEMA hdb_catalog OWNER TO hasurauser;
ALTER SCHEMA hdb_views OWNER TO hasurauser;

-- grant select permissions on information_schema and pg_catalog. This is
-- required for hasura to query list of available tables
GRANT SELECT ON information_schema.table_constraints, information_schema.key_column_usage, information_schema.columns, information_schema.views, information_schema.schemata, information_schema.routines TO hasurauser;
GRANT SELECT ON pg_catalog.pg_constraint, pg_catalog.pg_class, pg_catalog.pg_namespace, pg_catalog.pg_attribute, pg_catalog.pg_proc, pg_catalog.pg_available_extensions, pg_catalog.pg_statio_all_tables, pg_catalog.pg_description TO hasurauser;


GRANT USAGE ON SCHEMA public TO hasurauser;
GRANT SELECT, INSERT ON public.users TO hasurauser;
GRANT SELECT, INSERT ON public.todos TO hasurauser;