import { response, request } from "express";
import jwt from "jsonwebtoken";
import Usuario from '../models/usuario.js';

export const validarJWT = async(req= request, res=response, next) => {
    const token = req.header('x-token');
     if(!token){
        return res.status(401).json({
            msg: 'No existe Token en la peticion'
        });
    }
    try {
        //funcion que verifica la valides del token
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 

        const usuario = await Usuario.findById(uid);

        // Verificar si el usuario existe en la DB
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        // Verificar si el usuario tiene estado en true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }

        // Crear una nueva propiedad en el objeto request con los datos del usuario
        req.usuario = usuario; 

        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no Valido'
        })
    }
}
