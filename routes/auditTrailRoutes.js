import express from 'express';
import * as auditTrailController from '../controllers/auditTrailController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', verifyToken, auditTrailController.getAuditTrails);

export default router;
