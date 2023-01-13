const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");

const scheduler = new ToadScheduler();

const SmsStackSend = new Task("check for messages and send them out", () => {
  messages = [];

  sendSms(
    "Hello World",
    process.env.MY_PHONE_NUMBER,
    process.env.TWILIO_PHONE_NUMBER
  );
});
const job = new SimpleIntervalJob({ seconds: 1 }, task);
