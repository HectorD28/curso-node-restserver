import { Router } from "express";
import { check, query } from "express-validator";
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } from "../controller/usuarios.js";
//import { validarCampos } from "../middlewares/validar-campos.js";
import Role from "../models/role.js";
import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validator.js";
//import { validarJWT } from "../middlewares/validar-jwt.js";
//import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";
import {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} from '../middlewares/index.js'; 


const router = Router();

router.get('/',[
    query('limite', 'El valor de \'limite\' debe ser numérico').isNumeric().optional(),
    query('desde', 'El valor \'desde\' debe ser numérico').isNumeric().optional(),
    validarCampos
], usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('correo').custom(emailExiste),
    check('password', 'El Password obligatorio y mas de 6 letras').isLength({min: 6}),
    // check('rol', 'No es un Rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

export default router;