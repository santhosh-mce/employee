import express from 'express';
import * as authController from '../controllers/authController.js'; // Import as named imports

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;