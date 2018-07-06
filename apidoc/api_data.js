define({ "api": [
  {
    "group": "chat",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/getPreviousMessages",
    "title": "to get all chats of a room.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "roomName",
            "description": "<p>(query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\"error\": false,\n\"message\": \"all details found\",\n\"status\": 200,\n\"data\": [\n    {\n        \"message\": \"bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb\",\n        \"sender\": \"ankit anand\",\n        \"roomName\": \"today\",\n        \"createdON\": \"2018-07-04T17:16:02.006Z\"\n    },\n    {\n        \"message\": \"i dont think this is going to work\",\n        \"sender\": \"ankit anand\",\n        \"roomName\": \"today\",\n        \"createdON\": \"2018-07-04T17:15:34.536Z\"\n    },",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/chatRouter.js",
    "groupTitle": "chat",
    "name": "GetApiV1Getpreviousmessages"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZGQiOiJTMWtRRW8zejciLCJpYXQiOjE1MzA4NjQ2NjI1NDksImV4cCI6MTUzMDk1MTA2Miwic3ViIjoiYXV0aFRva2VuIiwiaXNzIjoiZWRDaGF0IiwiZGF0YSI6eyJ1c2VySWQiOiJya3lFdUxiR1giLCJmaXJzdE5hbWUiOiJhbmtpdCIsImxhc3ROYW1lIjoiYW5hbmQiLCJlbWFpbCI6ImFAYS5jb20iLCJtb2JpbGVOdW1iZXIiOjg4ODQzODMxMzF9fQ.5-4nXOIlvLWt0BXWvrFs-j659oYfb1NiHNSSvuhhwLU\",\n        \"userDetails\": {\n            \"userId\": \"rkyEuLbGX\",\n            \"firstName\": \"ankit\",\n            \"lastName\": \"anand\",\n            \"email\": \"a@a.com\",\n            \"mobileNumber\": 8884383131\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword/:email",
    "title": "api for user password reset.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (URL paramerter) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Newpassword of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"User details edited\",\n    \"status\": 200,\n    \"data\": {\n        \"ok\": 1,\n        \"nModified\": 1,\n        \"n\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersResetpasswordEmail"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/singup",
    "title": "api for new user singup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>first Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "LastName",
            "description": "<p>last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "Mobile",
            "description": "<p>mobileNumber  of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"user signed up successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"SkdiXihG7\",\n        \"firstName\": \"nool\",\n        \"lastName\": \"niuk\",\n        \"email\": \"nook@nook.com\",\n        \"mobileNumber\": 8884383131,\n        \"createdOn\": \"2018-07-06T08:09:03.000Z\",\n        \"_id\": \"5b3f239f66e19216446123aa\",\n        \"__v\": 0\n    }\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSingup"
  }
] });
