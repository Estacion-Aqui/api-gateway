import { model, Schema } from "mongoose";

const RoutesSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  path: {
    type: String,
    required: true
  },
  methods: [{
    type: String,
    required: true
  }],
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
    required: true
  },
  authenticate: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {
  timestamps: true,
});

export const RouteModel = model("route", RoutesSchema);
