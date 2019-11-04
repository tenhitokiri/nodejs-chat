//console.log("chat va acá");
$(function () {
    const socket = io();
    //Obtener elementos del DOM desde la interfaz
    const $messageForm = $('#message-form');
    const $message = $('#message');
    const $chat = $('#chat');

    //Obtener elementos del DOM desde formulario de Nickname
    const $nickform = $('#nick-form');
    const $nickname = $('#nick-name');
    const $nickerror = $('#nick-error');
    const $usernames = $('#user-names');


    //eventos
    $nickform.submit((e) => {
        e.preventDefault();
        let nickname = $nickname;
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                console.log('cliente: ' + $nickname.val());
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickerror.html(`
                <div class="alert alert-danger">Usuario ya existe</div>
                `);
            }
            $nickname.val('');
        });
    })

    $messageForm.submit(e => {
        e.preventDefault();
        let mensaje = $message.val();
        socket.emit('send message', $message.val())
        $message.val('');
    });

    socket.on('new message', (data) => {
        $chat.append(`<b>${data.nick}:</b> ${data.msg}<br/>`);
    });

    socket.on('usernames', (data) => {
        let html = '';
        data.forEach(user => {
            html += `<p><i class="fa fa-user"></i> ${user}</p>`
        });
        $usernames.html(html);
    });

})