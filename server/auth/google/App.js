import express from "express";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import cors from "cors";
// import { GoogleAuthUser } from "../google/model/userSchema.js";
import dotenv from 'dotenv';
import { User } from "../../models/UserModel.js";
import UserRouter from "../../routes/UserRoute.js";
// import GoogleRouter from "./routes/GoogleRoute.js";
dotenv.config(); // Load variables from .env file

const App = express();


// Now you can access the variables like this:
const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

App.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
App.use(express.json());


// Add this middleware to fix the Cross-Origin-Opener-Policy error
App.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// setup session
App.use(session({
  secret:clientsecret,
  resave: false,
  saveUninitialized: true,
}));

// setuppassport
App.use(passport.initialize());
App.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: clientid,
  clientSecret: clientsecret,
  callbackURL: "/auth/google/callback",
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("Profile ID:", profile.id);
    let user = await User.findOne({ googleid: profile.id });

    console.log("Existing user:", user);
    if (!user) {
      user = new User({
        googleid: profile.id,
        displayname: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    console.error("Error finding user:", error);
    return done(error, null);
  }
}));





passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google oauth login
App.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

App.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("http://localhost:3000/login"); // Redirect to login page on authentication failure
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("http://localhost:3000/dashboard"); // Redirect to dashboard on successful authentication
    });
  })(req, res, next);
});

App.get("/login/success", async (req, res) => {
  console.log(req.user)
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});


App.get("/logout",(req,res,next)=>{
    req.logout(function(err){
      if(err){return next(err)}
      res.redirect("http://localhost:3000");
    })
  })

  
  // App.use("/users", GoogleRouter);
  // App.use("/users", UserRouter);
  

export default App;
  














