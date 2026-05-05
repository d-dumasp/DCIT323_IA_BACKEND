import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Crypto from './models/Crypto.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await Crypto.deleteMany();
        console.log('Cleared existing crypto data.');

        // Fetch top 50 coins from CoinGecko
        console.log('Fetching data from CoinGecko...');
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
        const coins = await response.json();

        // Format and insert data
        const cryptosToInsert = coins.map(coin => ({
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            image: coin.image,
            change24h: coin.price_change_percentage_24h || 0
        }));

        await Crypto.insertMany(cryptosToInsert);
        console.log(`Successfully seeded ${cryptosToInsert.length} cryptocurrencies!`);

        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
