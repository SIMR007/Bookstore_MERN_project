// // server.mjs

// import express from 'express';
// import passport from 'passport';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import { User } from '../../models/UserModel.js';
// dotenv.config();

// const app = express();


// // Connect to MongoDB
// // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// // console.log('MongoDB connected');

// // User model

// // Passport Facebook strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL: 'http://localhost:6001/auth/facebook/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//     // Check if user already exists in the database
//     let user = await User.findOne({ facebookId: profile.id });

//     if (!user) {
//         // Create a new user if not found
//         user = new User({
//             facebookId: profile.id,
//             displayName: profile.displayName
//             // You can add more user fields here as needed
//         });
//         await user.save();
//     }

//     return done(null, user);
// }));

// // Passport serialization/deserialization
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err);
//     }
// });

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // Facebook authentication routes
// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }));

// // Example route to check if user is authenticated
// app.get('/api/user', (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json({ user: req.user });
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// });


// export default app;
// // const PORT = 6001;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
