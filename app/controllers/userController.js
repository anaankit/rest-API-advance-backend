const mongoose = require('mongoose');
const shortId = require('shortid');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const inputValidator = require('../libs/paramsValidationLib');
const tokenLib = require('../libs/tokenLib');
const check = require('../libs/checkLib');
const passwordLib = require('../libs/generatePasswordLib');
const time = require('../libs/timeLib');



// including models
const authModel = mongoose.model('Auth');
const userModel = mongoose.model('User');


let signUpFunction = (req, res) => {

    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                if (!inputValidator.Email(req.body.email)) {
                    let apiResponse = response.generate(true, 'email not valid', 400, null);
                    reject(apiResponse);
                } else if (check.isEmpty(req.body.password)) {

                    let apiResponse = response.generate(true, 'passsword missing', 400, null);
                    reject(apiResponse);

                } else {
                    resolve(req);
                }
            } else {
                let apiResponse = response.generate(true, 'email is missing', 400, null);
                reject(apiResponse);
            }
        })
    } //  end of validate user input

    let createUser = () => {

        return new Promise((resolve, reject) => {
            userModel.findOne({ email: req.body.email })
                .exec((err, retreiveduserDetails) => {

                    if (err) {
                        logger.error('error in searching for user', 'create user', 10);
                        let apiResponse = response.generate(true, 'error in searching for user', 400, null);
                        reject(apiResponse)
                    } else if (check.isEmpty(retreiveduserDetails)) {
                        id = shortId.generate()
                        let newUser = new userModel({
                            userId: id,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            password: passwordLib.hashpassword(req.body.password),
                            email: req.body.email,
                            mobileNumber: req.body.mobileNumber,
                            createdOn: time.now()


                        }) // end of new user

                        newUser.save((err, newUserDetails) => {
                            if (err) {
                                logger.error('error in saving the new userr', 'newuser', 10);
                                let apiResponse = response.generate(true, 'error in saving new user', 400, null);
                                reject(apiResponse);
                            } else {
                                let newUserObj = newUserDetails.toObject();
                                resolve(newUserObj);
                            }
                        })  //  end of save new user

                    }else{
                        logger.error('user already exists','create user',6);
                        apiResponse = response.generate(true,'user already exists',400,null);
                        reject(apiResponse)
                    }

                })


        }) // end of promise

    } // end of create user

    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            delete resolve.password
            let apiResponse = response.generate(false, 'user signed up successfully', 200, resolve);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.send(err);
        })

} // end of signup function


let login = (req, res) => {
    let findUser = () => {
        console.log("findUser");
        return new Promise((resolve, reject) => {
            if (req.body.email) {
                console.log("req body email is there");
                console.log(req.body);
                userModel.findOne({ email: req.body.email}, (err, userDetails) => {
                    /* handle the error here if the User is not found */
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'userController: findUser()', 10)
                        /* generate the error message and the api response message here */
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                        /* if Company Details is not found */
                    } else if (check.isEmpty(userDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'userController: findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'userController: findUser()', 10)
                        resolve(userDetails)
                    }
                });
               
            } else {
                let apiResponse = response.generate(true, '"email" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }
    let validatePassword = (retrievedUserDetails) => {
        console.log("validatePassword");
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePassword()', 10)
                    let apiResponse = response.generate(true, 'Wrong Password.Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        console.log("generate token");
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }
    let saveToken = (tokenDetails) => {
        console.log("save token");
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new authModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }

    findUser(req,res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log("errorhandler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })
}



// end of the login function 


let getAllUsers = (req,res) =>{

    userModel.find()
    .exec((err,result)=>{
        if(err){
            logger.error('db error unable to search','gell all users',10);
            let apiResponse = response.generate(true,'unable to search',400,null)
            res.send(apiResponse)
        }if(check.isEmpty(result)){
            logger.error('empty result returned','getAllUSers',7)
            let apiResponse = response.generate(true,'epmpt result returned',500,null)
            res.send(apiResponse)
        }else{
            logger.info('found all  user details','getAllUsers',5);
            let apiResponse = response.generate(false,'found all users',200,result)
            res.send(apiResponse)
        }
    })
} //  end of get all users

let getSingleUser = (req,res) =>{
    userModel.findOne({email:req.body.email})
    .exec((err,result)=>{
        if(err){
            logger.error('db error unable to search','gell all users',10);
            let apiResponse = response.generate(true,'unable to search',400,null)
            res.send(apiResponse)
        }if(check.isEmpty(result)){
            logger.error('empty result returned','getAllUSers',7)
            let apiResponse = response.generate(true,'epmpt result returned',500,null)
            res.send(apiResponse)
        }else{
            logger.info('found all  user details','getAllUsers',5);
            let apiResponse = response.generate(false,'user found',200,result)
            res.send(apiResponse)
        }
    })
} // end of get single user

let logout = (req,res) =>{

    authModel.remove({userId:req.body.userId})
    .exec((err,result)=>{

        if(err){
            logger.error('some error occured','logout',10);
            let apiResponse = response.generate(true,'some error occured',4000,null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){

            logger.error('some error occured','logout',10);
            let apiResponse = response.generate(true,'empty result returned',400,null);
            res.send(apiResponse)

        }else{
            logger.info('user logged out successfully','logout',5);
            let apiResponse = response.generate(false,'user logged out successfully',200,result);
            res.send(apiResponse)
        }

    })
} // end of logout function


let chagePassword = (req,res) =>{
    
    userModel.update({'email':req.params.email},{'password': passwordLib.hashpassword(req.body.password)})
    .exec((err,result)=>{
        if(err){
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To edit user details', 500, null)
            res.send(apiResponse)
        }else if(check.isEmpty(result)){
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        }else{
            console.log(result);
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            console.log('passsword has been reset')
            res.send(apiResponse)
        }
    })

} // end of chane password;


module.exports = {

    signUpFunction:signUpFunction,
    login:login,
    getAllUsers:getAllUsers,
    getSingleUser:getSingleUser,
    logout:logout,
    chagePassword:chagePassword
}