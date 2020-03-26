This is where we put Firebase functions

Instructions were sourced from https://hasura.io/blog/authentication-and-authorization-using-hasura-and-firebase/
and are committed to Firebase with console `npm install && firebase deploy --only functions` from a logged-in cmdline version of firebase (installed via npm)

To redeploy firebase functions:

`
gcloud sql users set-password firebase_function_user --instance="your-gcloud-db" --password="firebase_function_password" && firebase --project "react-admin-low-code" functions:config:set database.ip="/cloudsql/react-admin-low-code:us-central1:your-gcloud-db" database.dbname="postgres" database.user="firebase_function_user" database.password="firebase_function_password" database.port=5432 && firebase deploy --only functions
`