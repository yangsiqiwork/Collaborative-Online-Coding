// module.exports = function(io) {
//     io.on('connection', (socket) => {
//         console.log(socket);

const { collection } = require("../models/problemModel")

//         var message = socket.handshake.query['message'];
//         console.log(message);

//         io.to(socket.id).emit('message','hehe from server');
//     });
  
// }

module.exports = function(io) {
    //collaboration sessions
    var collaborations = {};
    //map from socketId to sessionId
    var socketIdToSessionId = {};

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];
        
        socketIdToSessionId[socket.id] = sessionId;
        
        //add sockt.id to corresponding collaboration session participants when connection
        if (!collaborations[sessionId]) {
            collaborations[sessionId] = {
                'participants' : []
            };
        }
        collaborations[sessionId].participants.push(socket.id);
        
        //socket event listeners of client change
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            let sessionId = socketIdToSessionId[socket.id];
            if (sessionId in collaborations) {
                let participants = collaborations[sessionId].participants;
                for (let i = 0; i < participants.length; i++) {
                    if (participants[i] != socket.id) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("WARNING: could not tie socke_id to any collaboration")
            }
        });
    
    });



    
}
