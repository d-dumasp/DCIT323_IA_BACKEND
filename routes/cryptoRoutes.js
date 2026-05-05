import express from 'express';
import { getCryptos, getTopGainers, getNewListings, addCrypto } from '../controllers/cryptoController.js';

const router = express.Router();

router.get('/', getCryptos);
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);
router.post('/', addCrypto);

export default router;
