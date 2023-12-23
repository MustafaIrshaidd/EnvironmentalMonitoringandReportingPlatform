import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data_type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },

});

const DataModel = mongoose.model('Data', dataSchema);

export default DataModel;
