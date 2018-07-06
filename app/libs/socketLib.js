const socketio = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const shortId = require('shortid');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');

const events = require('events');
const eventsEmitter = new events.EventEmitter();
const tokenLib = require('../libs/tokenLib');
const response = require('../libs/responseLib');
const chatModel = mongoose.model('Chat');
const nodeMailer = require('../libs/nodemailerLib')

let chatRoomList = [];
let onlineRooms = [];
let setServer = (server) =>{

    let io = socketio.listen(server);

    let myIo = io.of('/');

    let currentUser;

    let univRm;
    
    myIo.on('connection',(socket)=>{
        socket.emit('verifyUser',"hi");
        onlineRooms = removeDuplicates(onlineRooms)
        socket.on('set-user',(authToken)=>{
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
                if(err){
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }else{
                    console.log('user verified')
                    //setting userDetails to variable currentUser
                    
                    onlineRooms = removeDuplicates(onlineRooms)

                    socket.emit('onlineRooms',onlineRooms)
                    console.log(onlineRooms);
                    currentUser = user.data;
                    socket.userId = user.userId;
                    let fullName = currentUser.firstName+' '+currentUser.lastName;
                    
                }

            }) // end of verify auth token

        })// end of on set-user

        socket.on('joinRoom',(data)=>{

            socket.join(data.roomName)

            onlineRooms = removeDuplicates(onlineRooms)

            onlineRooms.push(data.roomName)
            
            onlineRooms = removeDuplicates(onlineRooms)
                    
            socket.emit('onlineRooms',onlineRooms)


            socket.to(data.roomName).broadcast.emit('userJoined',data.joiner);

            //disconnect code

            // edit roomName code   

            socket.on('editRoomName',(data)=>{
                console.log('received edit room name')
               let index =  onlineRooms.indexOf(data.oldRoomName)
                onlineRooms.pop(index)
                onlineRooms.push(data.newRoomName);
                eventsEmitter.emit('editRoom',(data))
            })

            // end of edit room name code
            
            socket.on('disconnect',()=>{

                io.sockets.in(data.roomName).emit('userLeft',data.joiner);

            }) //  end of disconnnect

            //end of disconnect code 

            // sending online rooms list to all rooms
            // for(let each of onlineRooms){
            //     socket.to(each).broadcast.emit('onlineRooms',onlineRooms)
            // }

            socket.on('message',(msgData)=>{

                console.log(' message received'+msgData.message+'from'+msgData.sender+' '+msgData.roomName)

                io.sockets.in(msgData.roomName).emit('user_msg',msgData);
            
                setTimeout(function(){
                    eventsEmitter.emit('save-chat', msgData);
    
                },2000)

            })// end of on message            

            socket.on('typing',(typingData)=>{
                io.sockets.in(typingData.roomName).emit('user-Typing',typingData);
            }) // end of typing

            socket.on('notTyping',(notTypingData)=>{
                console.log(' emitting not tryping ');
                io.sockets.in(notTypingData.roomName).emit('userNotTyping'," ");
            }) // end of  not typing

            
            socket.on('killRoom',(roomDetails)=>{


                
                onlineRooms =  removeDuplicates(onlineRooms);

                let index = onlineRooms.indexOf(roomDetails.roomName)
                onlineRooms.pop(index);
                  
                  io.sockets.in(roomDetails.roomName).emit('exit'," ");
                  eventsEmitter.emit('deleteRoom',roomDetails)
                //    let index =  onlineRooms.indexOf(roomDetails.roomName)

                //    onlineRooms.pop(index)


            }) // end of socket kill room

            socket.on('sendMail',(mailDetails)=>{



                nodeMailer.sendMail(mailDetails)

                

            }) // end og sendMail

        }) // end of  on join room

        
    socket.on('sendMail',(mailDetails)=>{

        console.log('sending mail')

        nodeMailer.sendMail(mailDetails)

        

    })

    })// end of my io on connection

    


}// end of set Server


function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}



// writing db code out of socket code



eventsEmitter.on('save-chat',(data)=>{

    let newchat =  new chatModel({

        message:data.message,
        sender:data.sender,
        roomName:data.roomName,
        createdON:Date.now()
    })

        newchat.save((err,result)=>{

            if(err){
                logger.error('error occured while saving chat','save-chat',10);
            }else if(check.isEmpty(result)){
                logger.error('error occured while saving empy returned','save chat',10);
            }else{
                logger.info('save successfull','save-chat',5);
            }

        })
 })  

 eventsEmitter.on('editRoom',(data)=>{

    chatModel.update({roomName:data.oldRoomName},{roomName:data.newRoomName},{multi:true})
    .exec((err,result)=>{
        if(err){
            console.log('there was an DB error in updating the roomName')
        }else{
            console.log('success');
            
        }
    })

 })

eventsEmitter.on('deleteRoom',(data)=>{
    chatModel.deleteMany({roomName:data.roomName})
    .exec((err,result)=>{
        if(err){
            console.log('error occured in deleting');
        }else{
            console.log('delete success');
        }
    })
})

// end of on save chat




module.exports={
    setServer : setServer
}


