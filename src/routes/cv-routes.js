import express from 'express';
import {getAllCVsHandler, getCVByIdHandler, addCVHandler, updateCVHandler, deleteCVHandler, searchCVsHandler} from '../controllers/cv-controller.js';

const router = express.Router();

router.get('/cvs', getAllCVsHandler);
router.get('/cvs/:id', getCVByIdHandler);
router.post('/cvs', addCVHandler);
router.put('/cvs/:id', updateCVHandler);
router.delete('/cvs/:id', deleteCVHandler);
router.get('/cvs/search', searchCVsHandler); 

export default router;
