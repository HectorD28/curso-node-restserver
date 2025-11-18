import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controller/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);


// generar el JWT
// const token = await generarJWT(usuario.id);

export default router;