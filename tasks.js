const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const { Message } = require("./database/messageModel");
const { sendSms } = require("./twilio");

const scheduler = new ToadScheduler();
let messages = Message.find({ sent: false }, (err, messages) => {});
const SendSms = new Task("check for messages and send them out", async () => {
  const nm = await messages.clone();

  nm.forEach((message) => {
    if (message.sent === false) {
      setTimeout(sendSms(message.Content, message.To, message.From), 1000);

      message.sent = true;
      message.save();
      console.log("Message sent");
      console.log("---------------------------");
    }
  });

  // sendSms(
  //   "Hello World",
  //   process.env.MY_PHONE_NUMBER,
  //   process.env.TWILIO_PHONE_NUMBER
  // );

  // console.log("Hello World");
});
const job = new SimpleIntervalJob({ seconds: 5 }, SendSms);
module.exports = { job };
