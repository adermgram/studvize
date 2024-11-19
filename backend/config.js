import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const mongodbURL = process.env.MONGODB_URL;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT, mongodbURL, JWT_SECRET };
