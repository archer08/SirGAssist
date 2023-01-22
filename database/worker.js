const mongoose = require("mongoose");
const { object, string, number, date, InferType, boolean } = require("yup");
const { sendSms } = require("../twilio");

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
    lowercase: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  task: {
    type: String,
    required: true,
    default: "None",
    trim: true,
    lowercase: true,
  },
  skeduledTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});
workerSchema.post("save", (next) => {
  sendSms(
    "worker being saved",
    process.env.MY_PHONE_NUMBER,
    process.env.TWILIO_PHONE_NUMBER
  );
});

const Worker = mongoose.model("Worker", workerSchema);

const workerValidationSchema = object({
  name: string().required().min(1).max(50).trim().lowercase(),
  number: string().required().min(10).max(10).trim(),
  messages: string().required(),
  task: string().required().min(1).max(50).trim().lowercase(),
  skeduledTasks: string().required(),
});

const validateWorker = async (data) => {
  try {
    const validation = await workerValidationSchema.validate(data, {
      abortEarly: false,
    });
    return false;
  } catch (err) {
    return err.errors;
  }
};

const createWorker = async (data) => {
  const check = await validateWorker(data);

  try {
    const worker = new Worker(data);
    return worker.save();
  } catch (err) {
    return err;
  }
};

module.exports = { Worker, validateWorker, createWorker };
