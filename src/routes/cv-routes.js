import express from 'express';
import {getAllCVsHandler, getCVByIdHandler, addCVHandler, updateCVHandler, deleteCVHandler, searchCVsHandler} from '../controllers/cv-controller.js';

const router = express.Router();

router.get('/cvs', getAllCVsHandler);
router.get('/cvs/search', searchCVsHandler); // !!! doit venir AVANT
router.get('/cvs/:id', getCVByIdHandler);    // !!! sinon il capture "search"
router.post('/cvs', addCVHandler);
router.put('/cvs/:id', updateCVHandler);
router.delete('/cvs/:id', deleteCVHandler);

export default router;
