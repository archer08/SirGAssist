scheduler.addSimpleIntervalJob(job);
const dotenv = require("dotenv");
dotenv.config();
const { sendSms } = require("./twilio");
