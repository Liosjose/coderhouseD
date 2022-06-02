import express from 'express'
import session from 'express-session'
import {connect} from './db/mongoBD.js' 
import User from './models/user.js'
import path from 'path';
import flash from 'connect-flash';
import passport from 'passport'

import engine from 'ejs-mate';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connect();



let app = express()

///---------------MIDDELEWARES-----------------//
app.use(session({
     secret: '2020',
     resave: false,
     saveUninitialized: false,
     cookie: { 
          maxAge: 6000
     }

}))

     


             

///---------------PASPORT-----------------------//
app.use(passport.initialize());
app.use(passport.session());
import ('./passport/passport.js');
app.use(flash());
app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  console.log(app.locals)
  next();
});
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');


import route from './routes/router.js'
app.use('/', route);





//-----------------------RUTAS----------------//
 



//listos

const PORT = 8080;
const server = app.listen(PORT, ()=>{ 
    console.log(`estamos en el puerto ${server.address().port}`);
})

server.on('error', error=>{  
    console.log(`este es el problema ${error}`);
})