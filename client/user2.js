// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZGQiOiJTSllZMVF6ZlgiLCJpYXQiOjE1MzAxNzUzNjExOTEsImV4cCI6MTUzMDI2MTc2MSwic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJ1c2VySWQiOiJya3lFdUxiR1giLCJmaXJzdE5hbWUiOiJhbmtpdCIsImxhc3ROYW1lIjoiYW5hbmQiLCJlbWFpbCI6ImFAYS5jb20iLCJtb2JpbGVOdW1iZXIiOjg4ODQzODMxMzF9fQ.VlzLhRLTE08-3DvcmV5XSb4TQQKt5d2PbAWRG3k26Es"
const userId = "rkyEuLbGX"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'SJYltsAWm',//putting user2's id here 
  receiverName: "rose",
  senderId: userId,
  senderName: "Ankit"
}


let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("setUser", authToken);

  });

  let room = '123';

  $('#create').on('click',function(){

    socket.emit('createRoom',room);

  })

  $('#send').on('click',function(){

    let messageText = $("#messageToSend").val()
    socket.emit('usermsg',messageText)
  })
  

  socket.on('message',function(data){

    console.log(data)

  })
  
  $('#join').on('click',()=>{
    socket.emit('join',room);
  })


}// end chat socket function

chatSocket();
