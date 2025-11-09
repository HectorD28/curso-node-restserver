import { Schema, model } from "mongoose";

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El Rol es Obligatorio']
    }
});

export default model('Role', RoleSchema);