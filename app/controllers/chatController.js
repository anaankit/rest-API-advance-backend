const mongoose = require('mongoose');
const logger =  require('../libs/loggerLib');
const check = require('../libs/checkLib');
const validateInput = require('../libs/paramsValidationLib');
const response = require('../libs/responseLib');
const token = require('../libs/tokenLib');
const time = require('../libs/timeLib');

// models
const chatModel = mongoose.model('Chat');
const UserModel = mongoose.model('User');
const AuthModel =  mongoose.model('Auth');


// function to retrieve chats of a group

let groupChat = (req,res)=>{

    let validateParams = () =>{

        return new Promise((resolve,reject)=>{

            if(check.isEmpty(req.query.roomName)){
                logger.info('parameters missing','validate params',8);
                let apiResponse = response.generate(true,'parameters missing',400,null);
                reject(apiResponse);
            }else{
                resolve();
            }

        }) // end of promise
    
    } // end of validate params

    let findChats = () =>{
        return new Promise((resolve,reject)=>{

            let findQuery = {
                roomName:req.query.roomName
            }

            chatModel.find(findQuery)
            .select('-_id -__v')
            .sort('-createdOn')
            .skip(parseInt(req.query.skip) || 0)
            .lean()
            // .limit(10)
            .exec((err,result)=>{
                if(err){
                    console.log(err)
                    logger.error(err.message, 'Chat Controller: getUsersChat', 10)
                    let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No Chat Found', 'Chat Controller: getUsersChat')
                    let apiResponse = response.generate(true, 'No Chat Found', 404, null)
                    reject(apiResponse)
                }else{
                    console.log('chat found and listed.')
                    // reversing array.
                    let reverseResult = result.reverse()
                     resolve(result)
                }
            })

        })
    } // end of findChats

    validateParams()
    .then(findChats)
    .then((result)=>{

        let apiResponse = response.generate(false,'all details found',200,result);
        res.send(apiResponse);
    }) 
    .catch((error)=>{
        res.send(error);
    })


} // end of group chat



module.exports = {

    groupChat:groupChat
    
}