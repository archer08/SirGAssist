// scheduler.addSimpleIntervalJob(job);
const dotenv = require("dotenv");
dotenv.config();
const { connectDb } = require("./database/mongoose");
connectDb();

const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const scheduler = new ToadScheduler();
const { Message, createMessage } = require("./database/messageModel");

const express = require("express");
const { MessagingResponse } = require("twilio").twiml;

const app = express();

app.post("/sms", async (req, res) => {
  const body = req.body.Body;
  console.log(body);
  const twiml = new MessagingResponse();
  // createMessage(Content, req.body.From, req.body.To);

  twiml.message("The Robots are coming! Head for the hills!");

  res.type("text/xml").send(twiml.toString());
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Express server listening on port 3000");
});
// const message = async () => {
//   try {
//     const message = await Message.create({
//       Content: "Welcome to SirG messaging service",
//       From: process.env.TWILIO_PHONE_NUMBER,
//       To: process.env.MY_PHONE_NUMBER,
//       Tag: "Welcome",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
// message();

// scheduler.addSimpleIntervalJob(job);
