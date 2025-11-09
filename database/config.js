import { mongoose } from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN);

        console.log('Base de datos OnLine');
    } catch (error) {
        console.log(error);
        throw new Error ('Error al iniciar la Base de Datos');
    }
}