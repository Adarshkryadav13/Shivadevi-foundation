import mongoose from "mongoose";

const upcomingEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    // Legacy field retained for backward compatibility with older records.
    date: { type: Date },
    time: { type: String, default: "" },
    location: { type: String, default: "" },
    category: { type: String, default: "" },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

upcomingEventSchema.pre("validate", function syncLegacyDate(next) {
  if (!this.startDate && this.date) this.startDate = this.date;
  if (!this.date && this.startDate) this.date = this.startDate;

  if (this.endDate && this.startDate && this.endDate < this.startDate) {
    return next(new Error("End date cannot be before start date"));
  }

  return next();
});

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