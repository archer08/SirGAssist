const Mongoose = require("mongoose");
// const { object, string, number, date, InferType, boolean } = require("yup");
const { ToadScheduler, SimpleIntervalJob, Task } = require("toad-scheduler");
const { sendSms } = require("../twilio");
const scheduler = new ToadScheduler();

const messageSchema = new Mongoose.Schema(
  {
    Content: { type: String, required: true },
    From: { type: String, required: true },
    To: { type: String, required: true },
    Date: { type: Date, required: true, default: Date.now },
    Tag: { type: String, required: true },
    sent: { type: Boolean, default: false, required: true },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);
messageSchema.post("save", (next) => {
  sendSms(
    `Message saved: ${this.Content}\nSent by:${this.From}`,
    process.env.MY_PHONE_NUMBER,
    process.env.TWILIO_PHONE_NUMBER
  );
});
const Message = new Mongoose.model("Message", messageSchema);

module.exports = { Message };
