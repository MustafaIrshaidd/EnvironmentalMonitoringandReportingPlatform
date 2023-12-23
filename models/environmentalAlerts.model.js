import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, required: true },
  alert_type: { type: String, required: true },
  threshold: { type: Number, required: true },
  is_active: { type: Boolean, default: true },
});

const Alert = mongoose.model("EnvironmentalAlert", alertSchema);

export default { Alert };
