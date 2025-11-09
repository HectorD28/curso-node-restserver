import { response, request } from "express";
import Usuario from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

export const usuariosGet = async(req = request, res = response) => {
    //const {q, nombre = 'no envia', apikey} = req.query;
    const {limite = 5, desde = 0} = req.query; // indicamos que vamos a recicibr un parametro: limite, con valor por defecto 5
    const query = {estado:true};
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), // retorna total
        Usuario.find(query) // retorna los usuarios
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
}

export const usuariosPut = async(req, res = response) => {
    const {id} = req.params; // params puede traer muchos datos
    // excluir password, google y correo (no se actualizan ) y todo lo demas lo almaceno en resto
    const {_id, password, google, correo, ...resto} = req.body;
    // POR HACER validar id contra la DB 
    if (password) {
        // Encriptar la contrasena en caso que venga en el body
        const salt = bcryptjs.genSaltSync(); // cantidad de vueltas que hara la encriptación por def.10
        resto.password = bcryptjs.hashSync(password); // encripta el password
    }
    // Actualiza el registro: lo busca por id y actualiza con los valores de resto
    const usuario = await Usuario.findOneAndUpdate({_id: id}, resto, { new: true });
    res.json({
        msg: 'put API - controller',
        usuario
    });
}

export const usuariosPost = async(req, res = response) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json(errores);
    }
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    // Verificar si existe correo
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        });
    }
    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync(); // cantidad de vueltas que hara la encriptacion por def.10
    usuario.password = bcryptjs.hashSync(password); // encripta el password
    await usuario.save(); // es para grabar en BD
    res.json({
        msg: 'post API - controller',
        usuario
    });
}

export const usuariosDelete = async(req, res = response) => {
    const {id} = req.params;
    // borrado fisico
    // const usuario = await Usuario.findByIdAndDelete(id);
    // borrado lógico
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        usuario
    });
}
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}