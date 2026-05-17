import mongoose from "mongoose";

const leadSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "New",
          "Pending",
          "Converted",
        ],
        default: "New",
      },
    },
    {
      timestamps: true,
    }
  );

const Lead =
  mongoose.model(
    "Lead",
    leadSchema
  );

export default Lead;