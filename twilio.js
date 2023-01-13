const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const { MessagingResponse } = require("twilio").twiml;
const client = require("twilio")(accountSid, authToken);

const sendSms = (message, to, from) => {
  try {
    client.messages
      .create({
        body: message,
        from: from,
        to: to,
      })
      .then((message) => console.log(message.sid));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendSms };
