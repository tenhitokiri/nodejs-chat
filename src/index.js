const express = require('express');
const morgan = require('morgan');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();

//Settings
const port = process.env.PORT || 3500;
app.set('port', port);

const server = http.createServer(app);
const io = socketio.listen(server);

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