import Crypto from '../models/Crypto.js';

// @route   GET /api/crypto
// @desc    Get all cryptocurrencies
export const getCryptos = async (req, res) => {
    try {
        const cryptos = await Crypto.find({});
        res.json(cryptos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route   GET /api/crypto/gainers
// @desc    Get top gainers sorted by 24h change
export const getTopGainers = async (req, res) => {
    try {
        // Sort by change24h descending
        const gainers = await Crypto.find({}).sort({ change24h: -1 });
        res.json(gainers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route   GET /api/crypto/new
// @desc    Get newest listings sorted by creation date
export const getNewListings = async (req, res) => {
    try {
        // Sort by createdAt descending
        const newCryptos = await Crypto.find({}).sort({ createdAt: -1 });
        res.json(newCryptos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @route   POST /api/crypto
// @desc    Add a new cryptocurrency
export const addCrypto = async (req, res) => {
    try {
        const { name, symbol, price, image, change24h } = req.body;

        if (!name || !symbol || price === undefined || !image || change24h === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const crypto = await Crypto.create({
            name,
            symbol,
            price,
            image,
            change24h
        });

        res.status(201).json(crypto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
