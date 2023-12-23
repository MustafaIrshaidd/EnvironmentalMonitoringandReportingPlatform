import mongoose from "mongoose";

const { Schema } = mongoose;

const resourceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const ResourceModel = mongoose.model("Resource", resourceSchema);

export default ResourceModel;
