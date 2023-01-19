// This will load the SDK and reuse your Fonos credentials
const Fonos = require("@fonoster/sdk");
const callManager = new Fonos.CallManager({
  accessKeyId: "nopushingkeys",
  accessKeySecret:
    "nopushingkeys",
});

// Few notes:
//  1. Update the from to look exactly as the Number you added
//  2. Use an active phone or mobile
//  3. Replace the webhook with the one from your Ngrok

async function call(phone, persona) {
  await callManager.call({
    from: "9842753579",
    to: phone,
    metadata: {persona },
    ignoreE164Validation: true,
  });
}

exports.call = call;
