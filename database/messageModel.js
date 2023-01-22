const mongoose = require("mongoose");
const { object, string, number, date, InferType, boolean } = require("yup");

const messageSchema = new mongoose.Schema({
  Content: { type: String, required: true },
  From: { type: String, required: true },
  To: { type: String, required: true },
  Date: { type: Date, required: true },
  Tag: { type: String, required: true },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
  replied: { type: Boolean, default: false },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
});

const Message = mongoose.model("Message", messageSchema);
const messageValidationSchema = object({
  Content: string().required(),
  From: string().required(),
  To: string().required(),
  Date: date().required(),
  Tag: string().required(),
  person: string().required(),
  replied: boolean().required(),
});
const validatemessage = async (data) => {
  try {
    const validation = await messageValidationSchema.validate(data, {
      abortEarly: false,
    });
    return false;
  } catch (err) {
    return err.errors;
  }
};
const createMessage = async (data) => {
  const check = await validatemessage(data);

  try {
    if (check) {
      return "Invalid Data";
    }
    const message = new Message(data);
    return message.save();
  } catch (err) {
    return err;
  }
};

module.exports = { Message, validatemessage, createMessage };
