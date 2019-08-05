# Project Title

The best Server ever

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