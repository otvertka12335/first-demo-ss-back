# Sequelize Server

The best Server ever for first demo 

---
## Requirements

For development, you will only need Node.js

    $ node --version
    v10.16.x

    $ npm --version
    6.10.x

## Install

    $ git clone https://gitlab.com/otvertka12335/sequelizeserver.git
    $ cd sequelizeserver
    $ npm i

## Configure app

Open `api/server/src/config/config.js` then edit it with your settings. You will need edit development settings.

## First running the project

This command you should run for migrate database and fill data

    $ npm run migrate
    
## Next running the project

    $ npm run dev 
or

    $ npm run start
    
    
    
## **Check result**

Open `http://localhost:8000/api/v1/` in your browser

**Show List of Users**
----
  Returns json data list of users.

* **URL**

  /users

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```json
{
  "status": "success",
  "message": "Users",
  "data": [
    {
      "id": 18,
      "username": "vkravchik@gmail.com",
      "name": "Vadym",
      "password": "sha1$a1080954$1$7e7b9e0a0c359a0dc6d1ad55473918f31e1d4f36",
      "accepted": true,
      "createdAt": "2019-08-03T14:39:44.252Z",
      "updatedAt": "2019-08-03T14:41:10.129Z"
    },
    {
      "id": 19,
      "username": "vkravchik2@rmailcloud.com",
      "name": "Haku",
      "password": "sha1$d56f3c96$1$41954e2bb56fb45d898e1e37e7a8f9b63c3dac4a",
      "accepted": true,
      "createdAt": "2019-08-03T14:41:44.520Z",
      "updatedAt": "2019-08-03T14:43:33.691Z"
    }
  ]
}
```

**Show List of Projects**
----
  Returns json data list of projects.

* **URL**

  /projects

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```json
{
  "status": "success",
  "message": "Projects",
  "data": [
    {
      "id": 7,
      "name": "Not",
      "description": "Ngngngngn",
      "userId": 18,
      "createdAt": "2019-08-03T15:08:07.650Z",
      "updatedAt": "2019-08-03T15:08:07.650Z",
      "User": {
        "id": 18,
        "username": "vkravchik@gmail.com",
        "name": "Vadym",
        "password": "sha1$a1080954$1$7e7b9e0a0c359a0dc6d1ad55473918f31e1d4f36",
        "accepted": true,
        "createdAt": "2019-08-03T14:39:44.252Z",
        "updatedAt": "2019-08-03T14:41:10.129Z"
      }
    },
    {
      "id": 6,
      "name": "Tratataar",
      "description": "Gggggg",
      "userId": 19,
      "createdAt": "2019-08-03T14:43:49.065Z",
      "updatedAt": "2019-08-03T14:46:33.127Z",
      "User": {
        "id": 19,
        "username": "vkravchik2@rmailcloud.com",
        "name": "Haku",
        "password": "sha1$d56f3c96$1$41954e2bb56fb45d898e1e37e7a8f9b63c3dac4a",
        "accepted": true,
        "createdAt": "2019-08-03T14:41:44.520Z",
        "updatedAt": "2019-08-03T14:43:33.691Z"
      }
    },
    {
      "id": 5,
      "name": "Title",
      "description": "Descr",
      "userId": 18,
      "createdAt": "2019-08-03T14:41:28.244Z",
      "updatedAt": "2019-08-03T14:41:28.244Z",
      "User": {
        "id": 18,
        "username": "vkravchik@gmail.com",
        "name": "Vadym",
        "password": "sha1$a1080954$1$7e7b9e0a0c359a0dc6d1ad55473918f31e1d4f36",
        "accepted": true,
        "createdAt": "2019-08-03T14:39:44.252Z",
        "updatedAt": "2019-08-03T14:41:10.129Z"
      }
    }
  ]
}
```

**Show List of Teams**
----
  Returns json data list of teams. Included project and user with here role.

* **URL**

  /teams

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```json
{
  "status": "success",
  "message": "Teams",
  "data": [
    {
      "id": 4,
      "project": 7,
      "user": 19,
      "role": "maintainer",
      "createdAt": "2019-08-05T08:17:30.114Z",
      "updatedAt": "2019-08-05T08:17:30.114Z",
      "project_id": {
        "id": 7,
        "name": "Not",
        "description": "Ngngngngn",
        "userId": 18,
        "createdAt": "2019-08-03T15:08:07.650Z",
        "updatedAt": "2019-08-03T15:08:07.650Z"
      },
      "user_id": {
        "id": 19,
        "username": "vkravchik2@rmailcloud.com",
        "name": "Haku",
        "password": "sha1$d56f3c96$1$41954e2bb56fb45d898e1e37e7a8f9b63c3dac4a",
        "accepted": true,
        "createdAt": "2019-08-03T14:41:44.520Z",
        "updatedAt": "2019-08-03T14:43:33.691Z"
      }
    },
    {
      "id": 3,
      "project": 6,
      "user": 18,
      "role": "maintainer",
      "createdAt": "2019-08-03T14:43:56.994Z",
      "updatedAt": "2019-08-03T14:43:56.994Z",
      "project_id": {
        "id": 6,
        "name": "Tratataar",
        "description": "Gggggg",
        "userId": 19,
        "createdAt": "2019-08-03T14:43:49.065Z",
        "updatedAt": "2019-08-03T14:46:33.127Z"
      },
      "user_id": {
        "id": 18,
        "username": "vkravchik@gmail.com",
        "name": "Vadym",
        "password": "sha1$a1080954$1$7e7b9e0a0c359a0dc6d1ad55473918f31e1d4f36",
        "accepted": true,
        "createdAt": "2019-08-03T14:39:44.252Z",
        "updatedAt": "2019-08-03T14:41:10.129Z"
      }
    }
  ]
}
```