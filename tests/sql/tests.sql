--These are some gimmick tests. For effective use, I rely heavily on prepared statements with results_eq().


-- Start a transaction
BEGIN;

-- How many tests are we running?
SELECT plan( 3 );

-- Define the tests
SELECT has_table( 'todos', 'todos table is present');
SELECT has_table( 'users', 'users table is present');
SELECT has_extension( 'pg_catalog', 'plpgsql', 'Should have pgsql extension' );

-- Run the tests
SELECT * FROM finish();

-- Undo our changes above
ROLLBACK;