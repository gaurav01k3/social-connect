import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" })


console.log("mongoURI", process.env.MONGO_URI);

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
        console.log(`Connection to mongoDB is successful,${conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
    }
}

export default connectDB;