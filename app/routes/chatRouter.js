const mongoose = require('mongoose');
const express = require('express');
const router =  express.Router();
const appConfig = require('../../config/appConfig');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')
const Auth =   mongoose.model('Auth')
const chatController = require('../controllers/chatController')

let baseUrl =`${appConfig.apiVersion}`;

let setRouter = (app) =>{

    app.get(baseUrl+'/getPreviousMessages',chatController.groupChat)
    
  /**
   * @apiGroup chat
   * @apiVersion  1.0.0
   * @api {get} /api/v1/getPreviousMessages to get all chats of a room.
   * 
   * @apiParam {string} roomName (query params) (required)
   * 
   * @apiSuccess {object} myResponse shows error status, message, http status code, result.
   * 
   * @apiSuccessExample {object} Success-Response:
     {
    "error": false,
    "message": "all details found",
    "status": 200,
    "data": [
        {
            "message": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "sender": "ankit anand",
            "roomName": "today",
            "createdON": "2018-07-04T17:16:02.006Z"
        },
        {
            "message": "i dont think this is going to work",
            "sender": "ankit anand",
            "roomName": "today",
            "createdON": "2018-07-04T17:15:34.536Z"
        },
        
     
 */


}


module.exports = {
    setRouter:setRouter
}