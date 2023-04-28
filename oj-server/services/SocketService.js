// module.exports = function(io) {
//     io.on('connection', (socket) => {
//         console.log(socket);

// const { collection } = require("../models/problemModel")

//         var message = socket.handshake.query['message'];
//         console.log(message);

//         io.to(socket.id).emit('message','hehe from server');
//     });
  
// }

// var redisClient = require('../modules/redisClient');
// const TIMEOUT_IN_SECONDS =  3600;

module.exports = function(io) {
    //collaboration sessions
    var collaborations = {};
    //map from socketId to sessionId
    var socketIdToSessionId = {};

    // var sessionPath = "/temp_sessions" //append到session key之前，不止给这project用


    
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
        
        // //如果collaborations中没有sessionId，表明不在内存中，就从redis中get，还原到
        // if (sessionId in collaborations) {
        //     collaborations[sessionId]['participants'].push(socket.id);
        // } else {
            
        //     redisClient.get(sessionPath + '/' + sessionId, function(data) { //注意”/“，如果有会得到data
        //         if (data) {//内存不存在，Redis存在，还原出来放到内存中
        //             console.log("session terminiated previously; pulling back from Redis")
        //             collaborations[sessionId] = {
        //                 'cachedChangeEvents' : JSON.parse(data),
        //                 'participants' : []
        //             };
        //         } else {//内存不存在，Redis也不存在，新的session
        //             console.log("creating new session");
        //             collaborations[sessionId] = {
        //                 'cachedChangeEvents' : [], 
        //                 'participants' : []
        //             };
        //         }
        //         collaborations[sessionId].participants.push(socket.id); //加入第一个人
        //     });
        // }
         
        
        //socket event listeners of client change
        socket.on('change', delta => {
            console.log("change " + socketIdToSessionId[socket.id] + " " + delta);
            // let sessionId = socketIdToSessionId[socket.id];
            
            // if (sessionId in collaborations) {
            //     collaborations[sessionId]['cachedChangeEvents'].push(["change", delta, Data.now()]);
            // }
            forwardEvents(socket.id, 'change', delta);
        });


        //handle cursorMove events
        socket.on('cursorMove', cursor => {
            console.log("cursorMove " + socketIdToSessionId[socket.id] + " " + cursor);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;

            forwardEvents(socket.id, 'cursorMove', JSON.stringify(cursor));
            
        });

        // //restore Buffer
        // socket.on('restoreBuffer', () =>{
        //     let sessionId = socketIdToSessionId[socket.id];
        //     console.log('restoring buffer for session: ' + sessionId + ', socket: ' + socket.id);
        //     if (sessionId in collaborations) {
        //         let changeEvents = collaborations[sessionId]['cachedChangeEvent'];
        //         for (let i = 0; i < changeEvents.length; i++) {
        //             socket.emit(changeEvents[i][0], changeEvents[i][1]);
        //         }
        //     }
        // });
        
        // //处理disconnect事件：当socket断开，会发出disconnect事件
        // socket.on('disconnect', function() {
        //     let sessionId = socketIdToSessionId[socket.id]; //拿sessionId
        //     console.log('socket' + socket.id + 'disconnected.');

        //     if (sessionId in collaborations) { //如果已经在memory里了
        //         let participants = collaborations[sessionId]['participants'];
        //         let index = participants.indexOf(socket.id); //session里参与者index
        //         if (index >= 0) { //理论上一定满足，但可能其他原因check一下，表明存在participants里
        //             participants.splice(index, 1); //删掉从index开始的一个元素          
                
        //             if (participants.length == 0) { //没有人了,就要从memory里转移到redis
        //                 console.log("last participant left, stroring in Redis");
        //                 let key = sessionPath + "/" + sessionId; //最好在外面写一个helper method保证修改后的正确
        //                 let value = JSON.stringify(collaborations[sessionId]['cachedchangeEvents']) //只存list of chging events，participants已经空了
        //                 redisClient.set(key, value, redisClient.redisPrint);
        //                 redisClient.expire(key, TIMEOUT_IN_SECONDS); //指定key的过期时间
        //                 delete collaborations[sessionId];
        //             }
        //         }
        //     }

        // });

        function forwardEvents(socketId, eventName, dataString){
            let sessionId = socketIdToSessionId[socketId];

            if (sessionId in collaborations) {
                let participants = collaborations[sessionId].participants;
                for (let i = 0; i < participants.length; i++) {
                    if (participants[i] != socket.id) {
                        io.to(participants[i]).emit(eventName, dataString);
                    }
                }
            } else {
                console.log("WARNING: could not tie socke_id to any collaboration")
            }
        }
    });
    




    
}
