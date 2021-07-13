const morgan = require('morgan');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const path = require('path');

//Settings
const port = process.env.PORT || 3500;
app.set('port', port);


//Usar Sockets
require('./socket')(io);

// Carpeta publica estática
app.use(express.static(path.join(__dirname, 'public')));
//Rutas 
app.get('/', (req, res) => {
    res.send('hola')
})

//Iniciado el servidor
server.listen(app.get('port'), () => {
    console.log(`Ejecutando Aplicación en puerto ${port}`);
});