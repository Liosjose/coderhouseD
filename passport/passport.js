import passport from 'passport'
import local from 'passport-local'
let LocalStrategy = local.Strategy

import User from '../models/user';

passport.serializeUser((user, done) => {
     done(null, user.id);
   });
   
   passport.deserializeUser(async (id, done) => {
     const user = await User.findById(id);
     done(null, user);
   });

passport.use('login', new LocalStrategy (
     (username,password,done)=>{ 
          User.findOne({username}), (err, user)=>{ 
               if(err)
               return done(err);
     
     if(!user){
          console.log('user not found')
          return done(null,false);
     }

     if(!isValidPassword (user,password)){ 
          console.log('Invalid Password');
          return done(null,false)
     }


     return done(null,user)
          }
     }
))


passport.use('register', new LocalStrategy(
     {
     username : 'username',
     password : 'password',
     passReqToCallback : true
 },

   async (req, username, password, done) => {
               const user = await User.findOne({'username': username})
               console.log(user)
               if(user) {
                 return done(null, false, console.log('User already Taken'));
               } else {
                 const newUser = new User();
                 newUser.username = username;
                 newUser.password = newUser.encryptPassword(password);
               console.log(newUser)
                 await newUser.save();
                 done(null, newUser);
               }
             }));
