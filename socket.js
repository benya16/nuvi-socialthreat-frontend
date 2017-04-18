// export function for listening to the socket
module.exports = function (socket)
{
    // send the new user their name and a list of users
    socket.emit('init',
        {
            connection: 'success'
        });

    socket.on('join', function()
    {
        console.log("connected to client socket");
        socket.emit('handshake');
    });

    socket.on('disconnect', function()
    {
        console.log("client socket disconnected");
    });
};