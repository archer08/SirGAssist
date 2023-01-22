const mongoose = require("mongoose");
const { date } = require("yup");
const { sendSms } = require("../twilio");

const personSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, immutable: true },
    createdAt: { type: Date, default: Date.now, immutable: true },
    Phone: { type: String, required: true },
    Email: { type: String },
    Role: { type: String, required: true },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    reminders: [
      {
        name: { type: String, required: true },
        createdAt: {
          type: Date,
          required: true,
          default: Date.now(),
          immutable: true,
        },
        message: { type: String, required: true },
        sentAt: { type: Date, required: true },
      },
    ],
  },
  {
    methods: {
      sendSms(message, recipiant) {
        sendSms(message, recipiant, process.env.TWILIO_PHONE_NUMBER);
      },
      sendmultipleSms(message, recipiants) {},
      addReminder(reminder) {
        this.reminders.push(reminder);
        this.save();
      },
      removeReminder(reminder) {
        this.reminders.pull(reminder);
        this.save();
      },
    },
  }
);

// personSchema.method("sendSms", function (message, recipiant) {
//   console.log(message, recipiant);

// });
personSchema.post("save", (next) => {});
module.exports = { Person: mongoose.model("Person", personSchema) };
