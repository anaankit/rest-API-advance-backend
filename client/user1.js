// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZGQiOiJySnhxQWZ6TW0iLCJpYXQiOjE1MzAxNzUxMTIyODMsImV4cCI6MTUzMDI2MTUxMiwic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJ1c2VySWQiOiJTSllsdHNBV20iLCJmaXJzdE5hbWUiOiJyb3NlIiwibGFzdE5hbWUiOiJyb3NlIiwiZW1haWwiOiJyb3NlQHJvc2UuY29tIiwibW9iaWxlTnVtYmVyIjo4ODg0MzgzMTMxfX0.vCV4sokgwjO3Kr7TDK5a0mwGf7Gr449XDBcDucJjbL8"
const userId = "SJYltsAWm"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'rkyEuLbGX',//putting user2's id here 
  receiverName: "Ankit",
  senderId: userId,
  senderName: "rose"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("setUser", authToken);

  });

  let room = '123';

  $('#create').on('click',function(){
    console.log('create room on client called')
    socket.emit('createRoom',room);

  })

  $('#send').on('click',function(){
    console.log('send on client called')
    let messageText = $("#messageToSend").val()
    socket.emit('usermsg',messageText)
  })


  socket.on('message',function(data){
    console.log('message client called')
    console.log(data);

  })
  



}// end chat socket function

chatSocket();
