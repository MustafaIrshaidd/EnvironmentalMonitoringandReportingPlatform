import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contributions: [
    {
      data_type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  interests: [
    {
      intreset: {
        type: String,
      },
    },
  ],
  connections: [
    {
      connectionId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  sustainability_score: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
