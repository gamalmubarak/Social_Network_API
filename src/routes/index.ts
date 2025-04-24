import { Router } from 'express';
import apiRoutes from './api/index.js'; // Import the API routes from the api folder


const router = Router();

router.use('/api', apiRoutes);

export default router;