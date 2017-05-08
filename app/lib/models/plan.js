const mongoose = require('mongoose')
const { Schema } = mongoose

const PlanSchema = Schema(
  {
    week: Number,
    amount: Number,
    contactId: String,
    status: String,
    interval: String,
    mode: String,
    remind: Boolean,
    reminderDate: Date
  },
  {
    timestamps: true
  }
)

const Plan = mongoose.model('Plan', PlanSchema)

module.exports = Plan
