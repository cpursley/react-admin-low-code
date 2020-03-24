--These are some gimmick tests.
-- For effective use, I rely heavily on prepared statements with results_eq().
-- Start a transaction
BEGIN;

-- How many tests are we running?
SELECT plan( 6 );

-- Define the tests
SELECT has_table( 'todos', 'todos table is present');
SELECT has_table( 'users', 'users table is present');
SELECT has_extension( 'pg_catalog', 'plpgsql', 'Should have pgsql extension' );
SELECT users_are(ARRAY[ 'postgres', 'hasurauser' ], 'Should have hasurauser as a user');
SELECT table_privs_are(
    'public', 'todos', 'hasurauser', ARRAY['SELECT', 'INSERT'],
    'hasurauser should be able to select and insert on todos'
);
SELECT table_privs_are(
    'public', 'users', 'hasurauser', ARRAY['SELECT', 'INSERT'],
    'hasurauser should be able to select and insert on users'
);
-- Run the tests
SELECT * FROM finish();

-- Undo our changes above
ROLLBACK;