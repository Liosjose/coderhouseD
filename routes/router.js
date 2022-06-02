import express  from 'express';
const router = express.Router();
import passport from 'passport'

router.get('/', (req, res, next) => {
     res.render('index');
   });
   
   router.get('/signup', (req, res, next) => {
     res.render('signup');
   });
   
   router.post('/signup', passport.authenticate('register', {
     successRedirect: '/profile',
     failureRedirect: '/signup',
     failureFlash: true
   })); 
   
   router.get('/signin', (req, res, next) => {
     res.render('signin');
   });
   
   
   router.post('/signin', passport.authenticate('login', {
     successRedirect: '/profile',
     failureRedirect: '/signin',
     failureFlash: true
   }));
   
   router.get('/profile',isAuthenticated, (req, res, next) => {
     res.render('profile');
   });
   
   router.get('/logout', (req, res, next) => {
     req.logout();
     res.redirect('/');
   });
   
   
   function isAuthenticated(req, res, next) {
     if(req.isAuthenticated()) {
       return next();
     }
   
     res.redirect('/')
   }
   
   

export default router;