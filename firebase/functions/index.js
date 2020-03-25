// This is sourced from https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/
// and also https://hasura.io/blog/build-flutter-app-hasura-firebase-part2/
// and is committed to Firebase with console `firebase deploy --only functions`
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const { Pool } = require('pg');
admin.initializeApp(functions.config().firebase);
//
// const pool = new Pool({
//   user: functions.config().database.user,
//   host: functions.config().database.ip,
//   database: functions.config().database.dbname,
//   password: functions.config().database.password,
//   port: functions.config().database.port,
// });


// On sign up.
exports.processSignUp = functions.auth.user().onCreate(user => {
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid
    }
  };

  // Below is only needed if you wish to have Firebase sync its users to a Google Cloud DB
  // // Write the new user to the database
  // const text = 'INSERT INTO public.users(id, email) VALUES($1, $2)';
  // const values = [user.uid, user.email];
  // (async () => {
  //   const client = await pool.connect();
  //   try {
  //     const res = await client.query(text, values);
  //     console.log(res.rows[0])
  //   } finally {
  //     // Make sure to release the client before any error handling,
  //     // just in case the error handling itself throws an error.
  //     client.release()
  //   }
  // })().catch(err => console.log(err.stack));

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      // Update real-time database to notify client to force refresh.
      const metadataRef = admin.database().ref("metadata/" + user.uid);
      // Set the refresh time to the current UTC timestamp.
      // This will be captured on the client to force a token refresh.
      return metadataRef.set({ refreshTime: new Date().getTime() });
        });
});