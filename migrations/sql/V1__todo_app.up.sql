/* Create TODOS app tables */

CREATE TABLE public.users (
id text not null primary key,
email text not null unique,
created_at timestamp with time zone not null default now(),
last_seen timestamp with time zone
);
insert into public.users(id, email)
SELECT cast('mlYsXk9rlHc37tYJXBCFMnzHEGF3' as varchar(100)) as id,
       cast('test@example.com' as varchar(100)) as email UNION ALL
SELECT cast('xVSkxIkpMFPReOrooBSuU3K6W4G2' as varchar(100)) as id,
       cast('test2@example.com' as varchar(100)) as email;


CREATE TABLE public.todos (
id bigserial not null primary key,
title text,
is_completed boolean default false,
is_public boolean default false,
created_at timestamp with time zone not null default now(),
user_id text not null references public.users(id)
);
INSERT INTO public.todos(title, is_completed, is_public, user_id)
SELECT 'todo by test@example.com' as title, false as is_completed, false as is_public,
       'mlYsXk9rlHc37tYJXBCFMnzHEGF3' as user_id UNION ALL
SELECT 'todo by test2@example.com' as title, false as is_completed, false as is_public,
       'xVSkxIkpMFPReOrooBSuU3K6W4G2' as user_id UNION ALL
SELECT 'public todo by test@example.com' as title, false as is_completed, true as is_public,
       'mlYsXk9rlHc37tYJXBCFMnzHEGF3' as user_id UNION ALL
SELECT 'public todo by test2@example.com' as title, false as is_completed, true as is_public,
       'xVSkxIkpMFPReOrooBSuU3K6W4G2' as user_id;


/* SET POSTGRES PERMISISONS FOR TODOS APP */
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
GRANT USAGE, SELECT ON SEQUENCE public.todos_id_seq TO hasurauser;