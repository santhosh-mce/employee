import AuditTrail from '../models/AuditTrail.js';

export const getAuditTrails = async (req, res) => {
  try {
    const auditTrails = await AuditTrail.find()
      .populate('userId', 'name') // Adjust according to your User model
      .populate('employeeId', 'name'); // Adjust according to your Employee model

    res.status(200).json(auditTrails);
  } catch (error) {
    console.error('Error fetching audit trails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
