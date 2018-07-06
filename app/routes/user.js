const mongoose = require('mongoose');
const express = require('express');
const router =  express.Router();
const appConfig = require('../../config/appConfig');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth')
const Auth =   mongoose.model('Auth')

let setRouter = (app) =>{

    let baseUrl =`${appConfig.apiVersion}/users`;

    app.post(`${baseUrl}/signup`,userController.signUpFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/singup api for new user singup.
     *
     * @apiParam {string} firstName first Name of the user. (body params) (required)
     * @apiParam {string} LastName  last Name of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *@apiParam {string} Mobile mobileNumber  of the user. (body params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "user signed up successfully",
    "status": 200,
    "data": {
        "userId": "SkdiXihG7",
        "firstName": "nool",
        "lastName": "niuk",
        "email": "nook@nook.com",
        "mobileNumber": 8884383131,
        "createdOn": "2018-07-06T08:09:03.000Z",
        "_id": "5b3f239f66e19216446123aa",
        "__v": 0
    }
}
    */

    
    app.post(`${baseUrl}/login`,userController.login);

    
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post}/api/v1/users/login api for user login.
     * 
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZGQiOiJTMWtRRW8zejciLCJpYXQiOjE1MzA4NjQ2NjI1NDksImV4cCI6MTUzMDk1MTA2Miwic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJ1c2VySWQiOiJya3lFdUxiR1giLCJmaXJzdE5hbWUiOiJhbmtpdCIsImxhc3ROYW1lIjoiYW5hbmQiLCJlbWFpbCI6ImFAYS5jb20iLCJtb2JpbGVOdW1iZXIiOjg4ODQzODMxMzF9fQ.5-4nXOIlvLWt0BXWvrFs-j659oYfb1NiHNSSvuhhwLU",
        "userDetails": {
            "userId": "rkyEuLbGX",
            "firstName": "ankit",
            "lastName": "anand",
            "email": "a@a.com",
            "mobileNumber": 8884383131
        }
    }
}
    */


    app.post(baseUrl+'/resetPassword/:email',userController.chagePassword)

    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post}/api/v1/users/resetPassword/:email api for user password reset.
     * 
     * @apiParam {string} email email of the user. (URL paramerter) (required)
     * @apiParam {string} password Newpassword of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
    "error": false,
    "message": "User details edited",
    "status": 200,
    "data": {
        "ok": 1,
        "nModified": 1,
        "n": 1
    }
}
    */



}


module.exports = {
    setRouter:setRouter
}