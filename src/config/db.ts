import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI!);
        const url = `${connection.connection.host}:${connection.connection.port}/${connection.connection.name}`;
        console.log(colors.cyan.bold(`MongoDB connected: ${url}`));
    } catch (error) {
        console.log(colors.bgRed.white.bold(`Error: ${error.message}`));
        process.exit(1);
    }
}