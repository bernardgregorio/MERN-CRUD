import mongoose from "mongoose";
const schema = mongoose.Schema;

const statusSchema = new schema({
  name: {
    type: String,
    default: "active",
  },
});

export default mongoose.model("Status", statusSchema);
