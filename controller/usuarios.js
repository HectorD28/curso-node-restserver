import { response, request } from "express";

export const usuariosGet = (req = request, res = response) => {
    const {q, nombre = 'no envia', apikey} = req.query;
    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey
    });
}

export const usuariosPut = (req, res = response) => {
    const {id} = req.params; // params puede traer muchos datos
    res.json({
        msg: 'put API - controller',
        id
    });
}

export const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}
export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}