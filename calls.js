// This will load the SDK and reuse your Fonos credentials
const Fonos = require("@fonoster/sdk");
const callManager = new Fonos.CallManager({
    accessKeyId: "PJ619c4f2c9a495b0600000014",
    accessKeySecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmb25vc3RlciIsInJvbGUiOiJQUk9KRUNUIiwiYWNjZXNzS2V5SWQiOiJQSjYxOWM0ZjJjOWE0OTViMDYwMDAwMDAxNCIsImlhdCI6MTYzNzYzMzgzNiwiZXhwIjoxNjY5MTkxNDM2fQ.InaOa41rxqX7U84pr5OyZKO5m0iKTWjlNNNuK8Y4ZqY"
  });

// Few notes:
//  1. Update the from to look exactly as the Number you added 
//  2. Use an active phone or mobile
//  3. Replace the webhook with the one from your Ngrok
callManager.call({
 from: "9842753579",
 to: "18298580570",

 webhook: "http://f507-152-0-233-69.ngrok.io",
 ignoreE164Validation: true
})
.then(console.log)
.catch(console.error);
