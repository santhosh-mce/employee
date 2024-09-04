import mongoose from "mongoose";

const auditTrailSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  previousData: {
    type: Object,
    required: true
  },
  newData: {
    type: Object,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Adjust if needed based on your User model
    required: true
  },
  changedAt: {
    type: Date,
    default: Date.now
  }
});

const AuditTrail= mongoose.model('AuditTrail', auditTrailSchema);
export default AuditTrail;
