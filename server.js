const express = require('express');
const cors = require("cors");
const { dbConnection } = require('./database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth : "/api/auth",
            // cars : "/api/carstracker",
        }

        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    routes() {
        this.app.use( this.paths.auth , require(__dirname + "/auth/auth_routes.js"));
    }

    async conectarDB() {
        await dbConnection();
    }

    listen() {
        console.log("Abierto en el puerto " + process.env.PORT)
        this.app.listen(this.port);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( express.static("public") );
    }
}

module.exports = Server