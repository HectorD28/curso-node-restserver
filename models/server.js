import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/user.js'

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        // Middleware
        this.middlewares();
        // Rutas de la aplicación
        this.routes();
    }

    // Definicion de middleware que publicaran la carpeta public
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body recibe lo que se envia
        this.app.use(express.json());
        // Directorio public
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, userRoutes)
    }
    
    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}


