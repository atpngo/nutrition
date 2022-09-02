import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

const connectMongo = async () => mongoose.connect(DATABASE_URL);

export default connectMongo;