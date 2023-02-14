const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const { Message } = require("./database/messageModel");

const scheduler = new ToadScheduler();

const SendSms = new Task("check for messages and send them out", async () => {
  const messages = await Message.find({ sent: false }, (err, messages) => {
    // sendSms(
    //   "Hello World",
    //   process.env.MY_PHONE_NUMBER,
    //   process.env.TWILIO_PHONE_NUMBER
    // );
  });
  console.log(messages);
});
const job = new SimpleIntervalJob({ seconds: 5 }, SendSms);
module.exports = { job };
