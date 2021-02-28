import { model, Schema } from "mongoose";

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  secretToken: {
    type: String,
    required: true
  },
  routes: [{
    type: Schema.Types.ObjectId,
    ref: "route",
  }],
}, {
  timestamps: true,
});

export const ServiceModel = model("service", ServicesSchema);
