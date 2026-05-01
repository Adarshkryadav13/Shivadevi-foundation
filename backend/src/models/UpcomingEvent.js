import mongoose from "mongoose";

const upcomingEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true },
    time: { type: String, default: "" },
    location: { type: String, default: "" },
    category: { type: String, default: "" },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("UpcomingEvent", upcomingEventSchema);

// import mongoose from "mongoose";

// const upcomingEventSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String, default: "" },

//     // ✅ DATE RANGE
//     startDate: { type: Date, required: true },
//     endDate: { type: Date },

//     time: { type: String, default: "" },
//     location: { type: String, default: "" },
//     category: { type: String, default: "" },
//     images: { type: [String], default: [] },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UpcomingEvent", upcomingEventSchema);