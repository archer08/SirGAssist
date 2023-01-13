const dotenv = require("dotenv");
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const { MessagingResponse } = require("twilio").twiml;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "This is the ship thaun in fourteen parsecs?",
    from: "+19143353478",
    to: "+19143866407",
  })
  .then((message) => console.log(message.sid));
