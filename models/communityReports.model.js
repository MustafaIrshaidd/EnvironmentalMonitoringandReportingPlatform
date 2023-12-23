import mongoose from "mongoose";

const Schema = mongoose.Schema;
const reportSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  report_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const CommunityReports = mongoose.model("community_report", reportSchema);

export default CommunityReports;
