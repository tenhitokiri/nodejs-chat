module.exports = (io) => {
    let nicknames = [
        'joe'
    ];
    io.on('connection', (socket) => {
        socket.on('new user', (data, cb) => {
            if (nicknames.indexOf(data) != -1) {
                console.log('Usuario Existe!!')
                cb(false);
            } else {
                cb(true);
                socket.nickname = data;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
        })
        socket.on('send message', data => {
            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickname
            });
        });

        socket.on('disconnect', data => {
            if (!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNicknames();
        });

        function updateNicknames() {
            io.sockets.emit('usernames', nicknames);

        }
    });

}