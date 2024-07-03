// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   date: { type: DataView, required: true },
// });

// module.exports = mongoose.model("Task", taskSchema);
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
});

// Format date before sending response
taskSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.date = obj.date.toISOString().split('T')[0];
  return obj;
};

module.exports = mongoose.model("Task", taskSchema);
